import { NextRequest, NextResponse } from "next/server";
import usersModel from "@/app/models/usersModel";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password, role } = body;

    // ✅ perhatikan: context.params adalah Promise
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, error: "id required in URL" }, { status: 400 });
    }

    // cari user by id
    const user = await usersModel.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // update field kalau ada di body
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (role) user.role = role;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json({ success: true, data: userObj }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
