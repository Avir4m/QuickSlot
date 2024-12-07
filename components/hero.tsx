import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="text-3xl">Organize your organizations</h1>

      <Button asChild>
        <Link href="/sign-up">
        Get Started
        </Link>
      </Button>

    </div>
  );
}
