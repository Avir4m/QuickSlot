import { getOrganization } from "@/app/actions/organizations";
import { createClient } from "@/utils/supabase/server";
import { Settings } from "lucide-react";
import Link from "next/link";

export default async function organizationPage({ params }: {params: Promise<{ uuid: string }>}) {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id;
    const uuid = (await params).uuid;
    const organization = await getOrganization(uuid);

    return (
        <>
            <div className="flex gap-32">
                { organization.name }
                { organization.owner_id === userId && (
                    <Link href={`/organizations/${uuid}/settings`}>
                        <Settings />
                    </Link>
                )}
            </div>
        </>
    );
}
