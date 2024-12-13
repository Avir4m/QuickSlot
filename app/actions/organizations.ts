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

export const organizationsUserIsIn = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const { data: organizations } = await supabase.from("Organizations").select().filter("members", "cs", `{${userId}}`);
  return organizations;
}

export const getOrganization = async (uuid: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Organizations").select("*").eq("id", uuid).single();

  if (error) {
    console.error("Error fetching organization:", error);
    throw new Error("Failed to fetch organization.");
  }

  return data;
};


export const isOwnerOfOrg = async (organizationId: any) => {
  const supabase = await createClient();
  const { data: user }  = await supabase.auth.getUser();
  const { data: organizationOwner, error } = await supabase.from("Organizations").select("owner_id").eq("id", organizationId).single();
  
  if (error || !organizationOwner) {
    return false;
  }

  return (organizationOwner.owner_id === user.user?.id);
}

export const deleteOrganization = async (organizationId: string) => {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  const { data: organizationOwner, error: ownerError } = await supabase
    .from("Organizations")
    .select("owner_id")
    .eq("id", organizationId)
    .single();

  if (ownerError || organizationOwner?.owner_id !== user.user?.id) {
    throw new Error("You do not have permission to delete this organization.");
  }

  const { error } = await supabase.from("Organizations").delete().eq("id", organizationId);
  if (error) {
    throw new Error(`Failed to delete organization: ${error.message}`);
  }

  return true;
};