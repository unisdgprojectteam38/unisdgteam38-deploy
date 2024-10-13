import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

import { getUserRole } from "@/utils/getUserRole";
export async function GET(request: NextRequest) {
  const supabase = createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await getUserRole(supabase);

  // Use the role as needed
  if (role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized. You need to be an admin" },
      { status: 401 }
    );
  }

  // Fetch all SDGs from the database
  const { data, error } = await supabase
    .from("sdgs")
    .select("*")
    .order("sdg_display_id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Existing POST method here...

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const role = await getUserRole(supabase);

  // Use the role as needed
  if (role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized. You need to be an admin" },
      { status: 401 }
    );
  }

  // Parse the request body
  const { title, descriptio, sdg_display_id } = await request.json();

  // Validate input
  if (!title || !description || !sdg_display_id) {
    return NextResponse.json(
      { error: "title and description and sdg_display_id are required" },
      { status: 400 }
    );
  }
  // examplel insertion. DO NOT UNCOMMENT
  // Insert the new SDG into the database
  //   const { data, error } = await supabase
  //     .from("sdgs")
  //     .insert({ title, description, sdg_display_id })
  //     .select()
  //     .single();

  return NextResponse.json({}, { status: 201 });
}