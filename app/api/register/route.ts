import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("DATA RECEIVED:", data);

    await prisma.registration.create({
      data: {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        town: data.town,
        attending: data.attending,
        days: data.days,
        department: data.department,
        position: data.position,
        accommodation: data.accommodation,
        diet: data.diet,
        health: data.health,
      },
    });

    return Response.json({ success: true });
 } catch (error) {
  console.log("Registration error:", error);

  return Response.json(
    { error: String(error) },
    { status: 500 }
  );
}
}
