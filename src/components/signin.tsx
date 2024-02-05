"use client";
import React from "react";
import { Button } from "./ui/button";
import { authLogin } from "@/app/actions/authLogin";
import { FaGoogle } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

function Signin() {
 async function onClick(provider: "google" | "github") {
  await authLogin(provider);
 }
 return (
  <div className=" flex gap-4 justify-center">
   <Button
    className=" flex gap-4 justify-center w-full"
    variant={"outline"}
    size={"lg"}
    onClick={() => onClick("google")}
   >
    <FaGoogle className="h-5 w-5" />
   </Button>
   <Button
    className=" flex gap-4 justify-center w-full"
    variant={"outline"}
    size={"lg"}
    onClick={() => onClick("github")}
   >
    <VscGithub className="h-5 w-5" />
   </Button>
  </div>
 );
}

export default Signin;
