"use client";

import { useState } from "react";

export default function Home() {
  const [attending, setAttending] = useState("yes");
const [message, setMessage] = useState("");
const [selectedTown, setSelectedTown] = useState("");
const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedPosition, setSelectedPosition] = useState("");
const [loading, setLoading] = useState(false);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
  console.log("FORM SUBMIT FUNCTION IS RUNNING");
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const dateOfBirth = formData.get("dateOfBirth") as string;
    setLoading(true);


const birthDate = new Date(dateOfBirth);
const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();

const hasBirthdayPassed =
  today.getMonth() > birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() &&
    today.getDate() >= birthDate.getDate());

if (!hasBirthdayPassed) {
  age--;
}
    const data = {
      name: formData.get("name"),
      dateOfBirth,
      age,
      gender: formData.get("gender"),
      address: formData.get("address"),
      town:
  formData.get("town") === "Other"
    ? formData.get("otherTown")
    : formData.get("town"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      attending,
      days: attending === "yes" ? formData.get("days") : "",
      department:
  formData.get("department") === "Other"
    ? formData.get("otherDepartment")
    : formData.get("department"),
    position:
  formData.get("position") === "Other"
    ? formData.get("otherPosition")
    : formData.get("position"),
      accommodation: formData.get("accommodation"),
      diet: formData.get("diet"),
      health: formData.get("health"),
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
  setMessage("Registration successful.");

  setTimeout(() => {
    window.location.href = `/success?name=${encodeURIComponent(String(data.name))}`;
  }, 1000);
} else {
  setMessage("Something went wrong. Please try again.");
  setLoading(false);
}
}

  return (
    <main
    className="min-h-screen p-6 bg-cover bg-center bg-fixed relative"
    style={{
      backgroundImage: "url('/images/church.jpeg')",
    }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
  
    <div className="relative z-10">
<div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
<div className="text-center mb-8">
  <img
    src="/images/logo.jpeg"
    alt="Bread of Life Logo"
    className="w-24 h-24 object-contain mx-auto mb-4"
  />


  <h2 className="text-2xl font-semibold text-gray-900 mt-2">
    3 Days of Power Conference
  </h2>

  <p className="text-gray-700 italic mt-2">
    Bringing Tens of Thousands into the Kingdom
  </p>

  <div className="border-t border-gray-300 mt-6 pt-4">
    <h3 className="text-xl font-bold text-gray-900">
      Conference Registration Form
    </h3>
  </div>
</div>
        {message && (
          <p className="text-center text-green-700 font-semibold mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
  <label
    htmlFor="name"
    className="block text-black font-semibold mb-2"
  >
    Full Name
  </label>

  <input
    id="name"
    name="name"
    type="text"
    required
    className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-700"
  />
</div>
          <div>
  <label
    htmlFor="dateOfBirth"
    className="block text-black font-semibold mb-2"
  >
    Date of Birth
  </label>

  <input
    id="dateOfBirth"
    name="dateOfBirth"
    required
    type="date"
    className="w-full border border-gray-300 p-3 rounded text-black"
  />

  <p className="font-semibold text-black">Gender</p>

  <label className="mr-4 text-black">
    <input type="radio" name="gender" value="Male" required /> Male
  </label>

  <label className="text-black">
    <input type="radio" name="gender" value="Female" required /> Female
  </label>
</div>
<div>
  <label
    htmlFor="phone"
    className="block text-black font-semibold mb-2"
  >
    Phone Number
  </label>

  <input
    id="phone"
    name="phone"
    type="tel"
    required
    className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-700"
  />
</div>
<div>
  <label
    htmlFor="email"
    className="block text-black font-semibold mb-2"
  >
    Email Address
  </label>

  <input
    id="email"
    name="email"
    type="email"
    required
    className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-700"
  />
</div>
          <div>
  <label
    htmlFor="address"
    className="block text-black font-semibold mb-2"
  >
    Residential Address
  </label>

  <input
    id="address"
    name="address"
    type="text"
    required
    className="w-full border border-gray-300 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-700"
  />
</div>
          <div>
          <div>
  <p className="font-semibold text-black mb-3">
    Which town are you from?
  </p>

  <div className="grid grid-cols-2 gap-2">

    {[
      "Livingstone",
      "Kazungula",
      "Zimba",
      "Kalomo",
      "Namwala",
      "Maamba",
      "Choma",
      "Munyumbwe",
      "Monze",
      "Njomona",
      "Mazabuka",
      "Siavonga",
      "Chirundu",
      "Other",
    ].map((town) => (
      <label key={town} className="flex items-center gap-2 text-black">
        <input
          type="radio"
          name="town"
          value={town}
          onChange={(e) => setSelectedTown(e.target.value)}
          required
        />
        {town}
      </label>
    ))}

  </div>

  {selectedTown === "Other" && (
    <div className="mt-4">
      <label className="block text-black font-semibold mb-2">
        Please specify
      </label>

      <input
        type="text"
        name="otherTown"
        className="w-full border border-gray-300 p-3 rounded-lg text-black"
      />
    </div>
  )}
</div>
</div>

          
          <div>
            <p className="w-full border border-gray-300 p-3 rounded text-black placeholder:text-gray-600">Are you attending the conference?</p>

            <label className="w-full border border-gray-300 p-3 rounded text-black placeholder:text-gray-600">
              <input
                type="radio"
                name="attending"
                value="yes"
                defaultChecked
                onChange={() => setAttending("yes")}
              />{" "}
              Yes
            </label>

            <label className="mr-4 text-black">
              <input
                type="radio"
                name="attending"
                value="no"
                onChange={() => setAttending("no")}
              />{" "}
              No
            </label>
          </div>

          {attending === "yes" && (
            <div>
            <label className="block text-black font-semibold mb-2">
              How many days will you be in Livingstone?
            </label>
          
            <select
              name="days"
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            >
              <option value="">Select number of days</option>
              <option value="1 Day">1 Day</option>
              <option value="2 Days">2 Days</option>
              <option value="3 Days">3 Days</option>
            </select>
          </div>
          )}

<div>
  <label className="block text-black font-semibold mb-3">
    Which Department you will be serving under
  </label>

  <select
    name="department"
    required
    onChange={(e) => setSelectedDepartment(e.target.value)}
    className="w-full border border-gray-300 p-3 rounded-lg text-black"
  >
    <option value="">Select Department</option>

    <option value="Protocol">Protocol</option>

    <option value="Ushering">Ushering</option>

    <option value="Praise and Worship">Praise and Worship</option>

    <option value="Media">Media</option>


    <option value="Hospitality">Hospitality</option>

    <option value="Councilor">Councilor</option>

    <option value="Guest Relation">Guest Relation</option>

    <option value="Medical Team">Medical Team</option>

    <option value="None">None</option>

    <option value="Other">Other</option>
  </select>

  {selectedDepartment === "Other" && (
    <div className="mt-4">
      <label className="block text-black font-semibold mb-2">
        Please specify
      </label>

      <input
        type="text"
        name="otherDepartment"
        required
        className="w-full border border-gray-300 p-3 rounded-lg text-black"
      />
    </div>
  )}
</div>
<div>
  <label className="block text-black font-semibold mb-3">
    What is your position?
  </label>

  <select
    name="position"
    required
    onChange={(e) => setSelectedPosition(e.target.value)}
    className="w-full border border-gray-300 p-3 rounded-lg text-black"
  >
    <option value="">Select Position</option>

    <option value="Bishop">Bishop</option>

    <option value="Reverend">Reverend</option>

    <option value="Pastor">Pastor</option>

    <option value="Elder">Elder</option>

    <option value="Deacon">Deacon</option>

    <option value="Deaconess">Deaconess</option>

    <option value="Chairperson">Chairperson</option>

    <option value="Director">Director</option>

    <option value="Secretary">Secretary</option>

    <option value="Committee Member">Committee Member</option>

    <option value="Ordinary">Ordinary</option>
  </select>

  {selectedPosition === "Other" && (
    <div className="mt-4">
      <label className="block text-black font-semibold mb-2">
        Please specify
      </label>

      <input
        type="text"
        name="otherPosition"
        required
        className="w-full border border-gray-300 p-3 rounded-lg text-black"
      />
    </div>
  )}
</div>

<div>
  <label className="block text-black font-semibold mb-3">
    Select Accommodation
  </label>

  <div className="flex gap-8">
    <label className="flex items-center gap-2 text-black">
      <input
        type="radio"
        name="accommodation"
        value="Church"
        required
      />
      Church Accommodation
    </label>

    <label className="flex items-center gap-2 text-black">
      <input
        type="radio"
        name="accommodation"
        value="Private"
        required
      />
      Private Accommodation
    </label>
  </div>
</div>

          <div>
  <label className="block text-black font-semibold mb-2">
    Diet Restrictions
  </label>

  <textarea
    name="diet"
    placeholder="Write none if you do not have any"
    className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder:text-gray-600"
  />
</div>
<div>
  <label className="block text-black font-semibold mb-2">
    Any health conditions needing special attention?
  </label>

  <textarea
    name="health"
    placeholder="Write none if you do not have any"
    className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder:text-gray-600"
  />
</div>
<button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-500 text-white p-4 rounded-xl font-bold text-lg shadow-lg transition"
>
  {loading ? "Submitting..." : "REGISTER NOW"}
</button>
        </form>
        <div className="text-center text-gray-700 text-sm mt-8 border-t pt-4">
  <p>Bread of Life Church International - Livingstone</p>
  <p>3 Days of Power Conference Registration Portal</p>
</div>
      </div>
      </div>
    </main>
  );
}

