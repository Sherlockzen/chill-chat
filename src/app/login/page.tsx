import React from "react";
// import { auth, authConfig } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Signin from "@/components/signin";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

async function Page() {
  // const { providers } = authConfig;
  // const session = await auth();

  // if (!session)
  return (
    <main className=" flex justify-center items-center h-svh w-svw">
      <Card className="w-[350px]">
        <CardHeader className=" text-center">
          <CardTitle>Entre com um dos serviços abaixo</CardTitle>
          <CardDescription>
            Autentique-se com o Google ou Github.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/*<Signin />*/}
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
              `w-full`,
            )}
            href={"/login/github"}
          >
            Entre com o Github
          </Link>
        </CardContent>
      </Card>
    </main>
  );
  // return redirect("/dashboard");
}

export default Page;
