"use client";

import { toast } from "@/components/ui/use-toast";

import { createClient } from "@/lib/supabase/client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // Explicitly state that user can be a User object or null
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignIn = async () => {
    setLoading(true); // Start loading before attempting to sign in

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message); // Manually throw an error to be caught
      }
      setUser(data.user);
      toast({ title: "success!" });
      router.push("/"); // Adjust the redirection URL as needed
    } catch (error) {
      toast({ title: "no work" });
    } finally {
      // Stop loading irrespective of the outcome
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  if (loading) {
    return <h1>loading..</h1>;
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-gray-700 text-4xl font-bold mb-2">Welcome to BEST</h1>

      <div className="bg-gray-300 p-8 rounded-lg  w-96">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4 w-full p-3 rounded-md border border-gray-300 bg-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-4 w-full p-3 rounded-md border border-gray-300 bg-gray-400 text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-green-300 text-gray-600 hover:bg-green-600 focus:outline-none transition duration-150 ease-in"
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
