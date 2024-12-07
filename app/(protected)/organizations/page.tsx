import { organizationsUserIsIn } from "@/app/actions/organizations/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function organizationsPage() {
    const organizations = await organizationsUserIsIn();
    const numOfOrganizations = organizations?.length;
    return (
        <>
        <div className="items-center flex flex-col gap-8">
            <Suspense fallback="You are currently in ... organizations">
                <h1>You are currently in { numOfOrganizations } organizations</h1>
                <div className="flex flex-col gap-8 items-center bg-gray-100 p-16 rounded-lg border">
                {organizations?.map((org, index) => (
                    <p key={index}><Link href={`/organizations/${org.id}`}>{org.name}</Link></p>
                )) || <p>No organizations found.</p>}
                </div>
            </Suspense>
            <Link href="/organizations/create-organization"><Button>Create an organization</Button></Link>
        </div>
        </>
    );
}