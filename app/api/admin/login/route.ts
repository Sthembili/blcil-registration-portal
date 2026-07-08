import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

const email = String(body.email).trim().toLowerCase();
const password = String(body.password).trim();

    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD:", password);

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    console.log("ADMIN FOUND:", admin);

    if (!admin) {
      return Response.json({ error: "Invalid login details" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return Response.json({ error: "Invalid login details" }, { status: 401 });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log("Login error:", error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}