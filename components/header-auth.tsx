import { signOutAction } from "@/app/actions/users";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const { data: { user }} = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={"/user"}>Hey, { user.user_metadata.display_name }!</Link>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
