import { signUpAction } from "@/app/actions/users";
import FormInput from "@/components/form-input";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default async function Signup(props: {searchParams: Promise<Message>;}) {

  const searchParams = await props.searchParams;

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-2">
            <FormInput 
                type="email" 
                label="Email" 
                name="email" 
                placeholder="you@example.com" 
                required={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FormInput 
                type="password" 
                label="Password" 
                name="password" 
                placeholder="Your password" 
                required={true}
            />
          </div>
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}