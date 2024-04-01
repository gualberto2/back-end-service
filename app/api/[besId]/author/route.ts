import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { besId: string } }
) {
  const supabase = createClient();

  try {
    if (!params.besId) {
      return new NextResponse("bes ID is required", { status: 400 });
    }

    let { data, error } = await supabase.from("author").select("*");

    //   .from("author")
    //   .select("*")
    //   .match({ blog_id: params.besId });

    return NextResponse.json(data);
  } catch (error) {
    console.log(" [AUTHOR_GET]] ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
