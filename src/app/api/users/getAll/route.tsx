import { connectToDatabase } from "@/lib/mongodb";
import usersModel from "@/app/models/usersModel";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { search = "", search_by = [], orderBy = "created_at", order = "desc", page = 1, size = 10 } = body;

    // Build query
    const query: any = {};

    if (search && search_by.length > 0) {
      query.$or = search_by.map((field: string) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }

    // Pagination
    const skip = (page - 1) * size;

    // Sorting
    const sort: any = {};
    sort[orderBy] = order === "desc" ? -1 : 1;

    // Get total count for pagination
    const totalData = await usersModel.countDocuments(query);
    const totalPages = Math.ceil(totalData / size);

    // Query data
    const users = await usersModel.find(query).sort(sort).skip(skip).limit(size).lean();

    // remove password field
    const sanitizedUsers = users.map((u: any) => {
      const { password, ...rest } = u;
      return rest;
    });

    return Response.json(
      {
        success: true,
        data: sanitizedUsers,
        totalData,
        totalPages,
        page,
        size,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
