import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Crown } from "lucide-react";
import { Suspense } from "react";

export default async function OrganizationsPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    throw new Error("You must be authenticated to view your organizations.");
  }

  const { data: organizations, error } = await supabase
    .from("Organizations")
    .select("id, name, owner_id")
    .filter("members", "cs", `{${user.user.id}}`);

  if (error) {
    throw new Error("Failed to load organizations.");
  }

  return (
    <div className="items-center flex flex-col gap-8">
      <Suspense fallback="Loading organizations...">
        <h1>You are currently in {organizations.length} organizations</h1>
        <div className="flex flex-col gap-8 items-center">
          {organizations.map((org) => {
            const isOwner = org.owner_id === user.user.id;
            return (
              <div key={org.id} className="flex items-center gap-2">
                <Link href={`/organizations/${org.id}`}>{org.name}</Link>
                {isOwner && <Crown className="text-yellow-500" size={16} />}
              </div>
            );
          })}
          {organizations.length === 0 && <p>No organizations found.</p>}
        </div>
      </Suspense>
      <Link href="/organizations/create-organization">
        <Button>Create an organization</Button>
      </Link>
    </div>
  );
}
