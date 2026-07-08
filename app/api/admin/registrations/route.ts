import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(registrations);
  } catch (error) {
    console.log("Fetch registrations error:", error);
    return Response.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}