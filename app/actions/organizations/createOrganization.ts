"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export const createOrganization = async (formData: FormData) => {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  const ownerId = user.user?.id;
  const name = formData.get("name")?.toString();
  

  if (!name) {
      return encodedRedirect(
          "error",
          "/organizations/create-organization",
          "Name is required",
        );
    }
  
    const { data, error } = await supabase.from("Organizations").insert([
      {
        name,
        owner_id: ownerId,
        members: [ownerId],
        services: [],
      },
    ]);

  if (error) {
      console.error(error.code + " " + error.message);
      return encodedRedirect("error", "/organizations/create-organization", error.message);
  }

  return encodedRedirect(
      "success",
      "/organizations",
      "You created an organization successfully",
    );
}