import { NextRequest, NextResponse } from "next/server";
import { deleteOrganization } from "@/app/actions/organizations";

export async function DELETE(req: NextRequest, { params }: { params: { uuid: string } }) {
  const { uuid } = params;

  if (!uuid) {
    return NextResponse.json({ message: "Invalid organization ID" }, { status: 400 });
  }

  try {
    await deleteOrganization(uuid);

    return NextResponse.json({ message: "Organization deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting organization:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
