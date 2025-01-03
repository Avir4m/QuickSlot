import { getOrganization, isOwnerOfOrg } from "@/app/actions/organizations";
import ApiActionButton from "@/components/ ApiActionButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
export default async function organizationSettingsPage({ params }: {params: Promise<{ uuid: string }>}) {
    const uuid = (await params).uuid;
    const organization = await getOrganization(uuid);

    return (
        <>
            <div className="flex">
                { organization.name }
            </div>

            <div className="flex gap-4">
                <Input defaultValue={ organization.name }/>
                <Button>Update</Button>
            </div>

            <ApiActionButton
            className="bg-red-500 hover:bg-red-600"
                label="Delete Organization"
                apiUrl={`/api/organizations/${organization.uuid}`}
                method="DELETE"
            />

        </>
    );
}