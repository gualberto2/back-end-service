import { createClient } from "@/lib/supabase/client";

const auth = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if user is not null before trying to access its properties
  if (user) {
    console.log(user.id);
    return user;
  } else {
    // Handle the case where user is null, for example, by returning null or throwing an error
    console.log("User not found");
    return null;
  }
};

export default auth;
