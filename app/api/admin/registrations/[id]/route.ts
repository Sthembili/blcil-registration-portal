import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.registration.delete({
      where: {
        id: Number(id),
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log("Delete registration error:", error);
    return Response.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    const updated = await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        town: data.town,
        department: data.department,
        position: data.position,
        accommodation: data.accommodation,
        diet: data.diet,
        health: data.health,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.log("Update registration error:", error);
    return Response.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}