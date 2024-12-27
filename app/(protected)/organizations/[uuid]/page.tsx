import { getOrganization, isOwnerOfOrg } from "@/app/actions/organizations";
import { Settings } from "lucide-react";
import Link from "next/link";
 
export default async function organizationPage({ params }: {params: Promise<{ uuid: string }>}) {
    const uuid = (await params).uuid;
    const organization = await getOrganization(uuid);
    const ownerCheck = await isOwnerOfOrg(uuid);

    return (
        <>
            <div className="flex gap-32">
                { organization.name }
                {ownerCheck && (
                <Link href={`/organizations/${uuid}/settings`}>
                    <Settings/>
                </Link>
                )}
            </div>
            
            
        </>
    );
}