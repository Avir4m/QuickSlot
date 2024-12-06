import { createOrganization } from "@/app/actions/organizations/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function createOrganizationPage(props: {searchParams: Promise<Message>;}) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex flex-col gap-16 items-center">
            <h1 className="text-xl">Create your Organization</h1>
            <form className="w-[256px] lg:w-[384px] flex flex-col gap-8">
                <div className="gap-2 flex flex-col">
                <Label>Name</Label>
                <Input
                name="name"
                placeholder="Name"
                />
                </div>
                <SubmitButton formAction={createOrganization} pendingText="Creating...">Create Organization</SubmitButton>
                <FormMessage message={searchParams}/>
            </form>
        </div>
    );
}