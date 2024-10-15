import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginFormClient from './login-form';
import Logo from './Logo';
import Footer from './Footer';


export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error && user) {
      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();
      // Create a new profile if it doesn't exist
      if (!profile && !profileError) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ id: user.id, role: "user" });
        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          console.log("Profile created successfully");
        }
      }
    }
    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";
 
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
 
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
 
    if (error) {
      console.log(error);
      return redirect("/login?message=Could not sign up user");
    }
 
    if (data.user) {
      // Create a profile for the new user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, role: 'user' });
 
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }
 
    return redirect("/login?message=Check email to continue sign in process");
  };

  const signInWithGoogle = async () => {
    "use server";
    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      return redirect("/login?message=Could not authenticate with Google");
    }
    return redirect(data.url);
  };

  const signInWithGithub = async () => {
    "use server";
    const origin = headers().get("origin");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      return redirect("/login?message=Could not authenticate with GitHub");
    }
    return redirect(data.url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Logo />
      <main className="flex-grow flex items-center justify-center">
        <div className="flex w-full max-w-4xl">
          <div className="hidden md:block w-1/2 bg-blue-900 rounded-l-lg"></div>
          <LoginFormClient
            signIn={signIn}
            signUp={signUp}
            signInWithGoogle={signInWithGoogle}
            signInWithGithub={signInWithGithub}
            message={searchParams?.message}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}