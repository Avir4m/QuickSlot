import { createOrganization } from "@/app/actions/organizations";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function createOrganizationPage(props: {searchParams: Promise<Message>;}) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex flex-col gap-16 items-center">
            <form className="flex flex-col min-w-128 max-w-128 mx-auto">
                <h1 className="text-2xl font-medium">Create your Organization</h1>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" placeholder="name" required />
                    <SubmitButton formAction={createOrganization} pendingText="Creating...">
                        Create Organization
                    </SubmitButton>
                    <FormMessage message={searchParams} />
                </div>
            </form>
        </div>
    );
}