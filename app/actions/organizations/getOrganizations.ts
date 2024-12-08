"use server";

import { createClient } from "@/utils/supabase/server";

export const organizationsUserIsIn = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const { data: organizations } = await supabase.from("Organizations").select().filter("members", "cs", `{${userId}}`);
  return organizations;
}

export const getOrganization = async (uuid: String) => {
  const supabase = await createClient();
  const { data: organization } = await supabase.from("Organizations").select("*").eq("id", uuid);
  return organization;
}