import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?message=No authorization code provided`);
  }

  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.redirect(`${origin}/login?message=Could not authenticate user`);
    }

    if (user) {
      // Check if user has a profile
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        // Create a new profile if one doesn't exist
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ 
            id: user.id, 
            role: "user",
            full_name: user.user_metadata?.full_name || null,
            profile_picture: user.user_metadata?.avatar_url || null
          });

        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          console.log("Profile created successfully for:", user.id);
        }
      }
    }

    return NextResponse.redirect(origin);
    
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.redirect(`${origin}/login?message=Authentication failed`);
  }
}