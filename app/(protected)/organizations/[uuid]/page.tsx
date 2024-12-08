import { SubmitButton } from "@/components/submit-button";

export default async function organizationPage({ params }: {params: Promise<{ uuid: string }>}) {
    const uuid = (await params).uuid
    return (
        <>
        { uuid }
        <SubmitButton className="bg-red-500 text-white">Delete Organization</SubmitButton>
        </>
    );
}