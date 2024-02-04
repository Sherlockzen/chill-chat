import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/server/auth";

function Signin({
 provider,
 ...props
}: {
 provider?: string;
} & React.ComponentPropsWithRef<typeof Button>) {
 console.log(provider);

 return (
  <form
   action={async () => {
    "use server";
    await signIn(provider);
   }}
  >
   <Button {...props}>Sign In - Google</Button>
  </form>
 );
}

export default Signin;
