export async function GET(req: Request) {
  try {
    return Response.json(
      {
        success: true,
        message: "Berhasil Mengirim Data",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
