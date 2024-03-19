import { createClient } from "@/lib/supabase/client";

const auth = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export default auth;
