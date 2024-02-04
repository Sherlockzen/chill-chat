import { Button } from "@/components/ui/button";
import React from "react";
import { auth } from "@/server/auth";
import Signin from "@/components/signin";

async function Page() {
 const session = await auth();
 if (!session)
  return (
   <main className=" flex justify-center items-center h-svh w-svw">
    <Signin />
   </main>
  );
 return (
  <main className=" flex justify-center items-center h-svh w-svw">
   {/* <Button variant={"default"}>Logar com o Google</Button> */}
   JA ESTA LOGADO! {session.user?.name}
  </main>
 );
}

export default Page;
