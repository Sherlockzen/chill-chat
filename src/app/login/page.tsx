import React from "react";
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
  return (
    <main className=" flex justify-center items-center h-svh w-svw">
      <Card className="w-[350px]">
        <CardHeader className=" text-center">
          <CardTitle>Entre com um dos serviços abaixo</CardTitle>
          <CardDescription>
            Autentique-se com o Google ou Github.
          </CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-6">
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
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
              `w-full`,
            )}
            href={"/login/google"}
          >
            Entre com o Google
          </Link>
        </CardContent>
      </Card>
    </main>
  );
  // return redirect("/dashboard");
}

export default Page;
