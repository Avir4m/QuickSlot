import { getOrganization, isOwnerOfOrg } from "@/app/actions/organizations";
import { Button } from "@/components/ui/button";
import { NextResponse } from "next/server";
 
export default async function organizationSettingsPage({ params }: {params: Promise<{ uuid: string }>}) {
    const uuid = (await params).uuid;
    const organization = await getOrganization(uuid);

    if (!isOwnerOfOrg(uuid)) {
        return NextResponse.redirect(new URL(`/organizations/${uuid}`)); 
    }

    return (
        <>
            <div className="flex">
                { organization.name }
            </div>
            
            <Button className="bg-red-500 text-white">
                Delete Organization
            </Button>
        </>
    );
}