import bcrypt from "bcryptjs";
import usersModel from "@/app/models/usersModel";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/app/utils/jwt";

type AuthUser = {
  id: string;
  role: string;
  [key: string]: any;
};

function getAuthUser(req: any): AuthUser | null {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  const payload = verifyToken(token);
  if (
    payload &&
    typeof payload === "object" &&
    "id" in payload &&
    "role" in payload
  ) {
    return {
      id: String((payload as any).id),
      role: String((payload as any).role),
      ...(typeof payload === "object" && payload !== null ? payload : {})
    } as AuthUser;
  }
  return null;
}

export async function GET(req: any, { params }: { params: any }) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(req);
    if (!authUser) return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id } = params;
    // allow only self or admin
    if (String(authUser.id) !== String(id) && authUser.role !== "admin") {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const user = await usersModel.findById(id).select("-password");
    if (!user) return Response.json({ success: false, error: "User not found" }, { status: 404 });

    return Response.json({ success: true, data: user }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: any, { params }: { params: any }) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(req);
    if (!authUser) return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id } = params;
    if (String(authUser.id) !== String(id) && authUser.role !== "admin") {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const updates: Record<string, any> = {};
    if (body.name) updates.name = body.name;
    if (body.email) updates.email = body.email.toLowerCase();
    if (body.password) updates.password = await bcrypt.hash(body.password, 10);

    const updated = await usersModel.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!updated) return Response.json({ success: false, error: "User not found" }, { status: 404 });

    return Response.json({ success: true, data: updated }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: { params: any }) {
  try {
    await connectToDatabase();
    const authUser = getAuthUser(req);
    if (!authUser) return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { id } = params;
    // only self or admin
    if (String(authUser.id) !== String(id) && authUser.role !== "admin") {
      return Response.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const deleted = await usersModel.findByIdAndDelete(id).select("-password");
    if (!deleted) return Response.json({ success: false, error: "User not found" }, { status: 404 });

    return Response.json({ success: true, data: deleted }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
