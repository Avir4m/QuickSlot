import { getOrganization, isOwnerOfOrg } from "@/app/actions/organizations";
import { Button } from "@/components/ui/button";

export default async function organizationPage({ params }: {params: Promise<{ uuid: string }>}) {
    const uuid = (await params).uuid;
    const organization = await getOrganization(uuid);
    const ownerCheck = await isOwnerOfOrg(uuid);

    return (
        <>
            { organization.name }
            {ownerCheck && (
                <Button className="bg-red-500 text-white">
                    Delete Organization
                </Button>
            )}
        </>
    );
}