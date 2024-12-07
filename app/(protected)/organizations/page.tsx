import { organizationsUserIsIn } from "@/app/actions/organizations/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function organizationsPage() {
    const organizations = await organizationsUserIsIn();
    const numOfOrganizations = organizations?.length;
    return (
        <>
        <div className="items-center flex flex-col gap-4">
            <Suspense fallback="You are currently in ... organizations">
                <h1>You are currently in { numOfOrganizations } organizations</h1>
                <div>
                {organizations?.map((org, index) => (
                    <p key={index}>{org.name} </p>
                )) || <p>No organizations found.</p>}
                </div>
            </Suspense>
            <Link href="/organizations/create-organization"><Button>Create an organization</Button></Link>
        </div>
        </>
    );
}