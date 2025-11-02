import usersModel from "@/app/models/usersModel";
import { signToken } from "@/app/utils/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return Response.json({ success: false, error: "name, email, password required" }, { status: 400 });
    }

    const existing = await usersModel.findOne({ email: email.toLowerCase() });
    if (existing) return Response.json({ success: false, error: "Email already registered" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);
    const user = await usersModel.create({ name, email: email.toLowerCase(), password: hashed, role: role });

    const token = signToken({ id: user._id, email: user.email, role: user.role });

    // remove password when returning
    const userObj = user.toObject();
    delete userObj.password;

    return Response.json({ success: true, data: { user: userObj, token } }, { status: 201 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
