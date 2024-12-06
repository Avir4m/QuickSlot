import { numberOfOrganizationsUserIsIn } from "@/app/actions/organizations/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default  function organizationsPage() {
    return (
        <div className="items-center flex flex-col gap-4">
            <h1>You are currently in { numberOfOrganizationsUserIsIn() } organizations</h1>
            <Link href="/organizations/create-organization"><Button>Create an organization</Button></Link>
        </div>
    );
}