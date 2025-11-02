import usersModel from "@/app/models/usersModel";
import { signToken } from "@/app/utils/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    if (!email || !password)
      return Response.json({ success: false, error: "email and password required" }, { status: 400 });

    const user = await usersModel.findOne({ email: email.toLowerCase() });
    if (!user) return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ id: user._id, email: user.email, role: user.role });
    const userObj = user.toObject();
    delete userObj.password;

    return Response.json({ success: true, data: { user: userObj, token } }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
