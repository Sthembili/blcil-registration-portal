"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((res) => res.json())
      .then((data) => setRegistrations(data));
  }, []);

  const filtered = registrations.filter((person) =>
    `${person.name} ${person.town} ${person.phone} ${person.email} ${person.department} ${person.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const attendingCount = registrations.filter(
  (person) => person.attending === "yes"
).length;

const notAttendingCount = registrations.filter(
  (person) => person.attending === "no"
).length;

const churchAccommodationCount = registrations.filter(
  (person) => person.accommodation === "Church"
).length;

const privateAccommodationCount = registrations.filter(
  (person) => person.accommodation === "Private"
).length;

  function logout() {
    document.cookie = "admin_token=; Max-Age=0; path=/";
    window.location.href = "/admin/login";
  }

  async function deleteRegistration(id: number) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this registration?"
  );

  if (!confirmDelete) return;

  const res = await fetch(`/api/admin/registrations/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setRegistrations((prev) =>
      prev.filter((person) => person.id !== id)
    );
  } else {
    alert("Failed to delete registration.");
  }
}

async function saveEdit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const updatedData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    town: formData.get("town"),
    department: formData.get("department"),
    position: formData.get("position"),
    accommodation: formData.get("accommodation"),
    diet: formData.get("diet"),
    health: formData.get("health"),
  };

  const res = await fetch(`/api/admin/registrations/${editing.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (res.ok) {
    const updated = await res.json();

    setRegistrations((prev) =>
      prev.map((person) => (person.id === updated.id ? updated : person))
    );

    setEditing(null);
  } else {
    alert("Failed to update registration.");
  }
}

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Registration Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
  <div className="bg-blue-900 text-white p-4 rounded-xl shadow">
    <p>Total Registrations</p>
    <h2 className="text-3xl font-bold">{registrations.length}</h2>
  </div>

  <div className="bg-green-700 text-white p-4 rounded-xl shadow">
    <p>Attending</p>
    <h2 className="text-3xl font-bold">{attendingCount}</h2>
  </div>

  <div className="bg-red-700 text-white p-4 rounded-xl shadow">
    <p>Not Attending</p>
    <h2 className="text-3xl font-bold">{notAttendingCount}</h2>
  </div>

  <div className="bg-purple-700 text-white p-4 rounded-xl shadow">
    <p>Church Accommodation</p>
    <h2 className="text-3xl font-bold">{churchAccommodationCount}</h2>
  </div>
</div>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, town, phone, email, department or position"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg text-black mb-6"
        />

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border p-2">Name</th>
                <th className="border p-2">Town</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Position</th>
                <th className="border p-2">Accommodation</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((person) => (
                <tr key={person.id} className="text-black">
                  <td className="border p-2">{person.name}</td>
                  <td className="border p-2">{person.town}</td>
                  <td className="border p-2">{person.phone}</td>
                  <td className="border p-2">{person.department}</td>
                  <td className="border p-2">{person.position}</td>
                  <td className="border p-2">{person.accommodation}</td>
                  <td className="border p-2">
                    <div className="flex gap-2">
  <button
    onClick={() => setSelected(person)}
    className="bg-blue-900 text-white px-3 py-1 rounded"
  >
    View
  </button>

<button
  onClick={() => setEditing(person)}
  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Edit
</button>

  <button
    onClick={() => deleteRegistration(person.id)}
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
            <div className="bg-white max-w-2xl w-full rounded-2xl p-6 text-black">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Registration Details
              </h2>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><strong>Name:</strong> {selected.name}</p>
                <p><strong>Age:</strong> {selected.age}</p>
                <p><strong>Date of Birth:</strong> {selected.dateOfBirth}</p>
                <p><strong>Gender:</strong> {selected.gender}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Address:</strong> {selected.address}</p>
                <p><strong>Town:</strong> {selected.town}</p>
                <p><strong>Attending:</strong> {selected.attending}</p>
                <p><strong>Days:</strong> {selected.days}</p>
                <p><strong>Department:</strong> {selected.department}</p>
                <p><strong>Position:</strong> {selected.position}</p>
                <p><strong>Accommodation:</strong> {selected.accommodation}</p>
                <p><strong>Diet:</strong> {selected.diet}</p>
                <p><strong>Health:</strong> {selected.health}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="mt-6 bg-gray-800 text-white px-5 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

{editing && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
    <form
      onSubmit={saveEdit}
      className="bg-white max-w-2xl w-full rounded-2xl p-6 text-black space-y-3"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Edit Registration
      </h2>

      <input name="name" defaultValue={editing.name} className="w-full border p-3 rounded" />
      <input name="phone" defaultValue={editing.phone} className="w-full border p-3 rounded" />
      <input name="email" defaultValue={editing.email} className="w-full border p-3 rounded" />
      <input name="town" defaultValue={editing.town} className="w-full border p-3 rounded" />
      <input name="department" defaultValue={editing.department} className="w-full border p-3 rounded" />
      <input name="position" defaultValue={editing.position} className="w-full border p-3 rounded" />
      <input name="accommodation" defaultValue={editing.accommodation} className="w-full border p-3 rounded" />
      <textarea name="diet" defaultValue={editing.diet} className="w-full border p-3 rounded" />
      <textarea name="health" defaultValue={editing.health} className="w-full border p-3 rounded" />

      <div className="flex gap-3">
        <button className="bg-blue-900 text-white px-5 py-2 rounded-lg">
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => setEditing(null)}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

    </main>
  );
}