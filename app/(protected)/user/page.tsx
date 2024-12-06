import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();

  return (
    <div className="flex-1 w-[256px] lg:w-[384px] mx-auto flex flex-col gap-12">
      <h2 className="font-bold text-2xl">Your user details</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Display Name</Label>
          <Input placeholder="Display Name" defaultValue={user?.user_metadata.display_name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input placeholder="Email" defaultValue={user?.email} disabled />
        </div>
        <Button>Update</Button>
      </div>
    </div>
  );
}
