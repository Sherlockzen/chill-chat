import "dotenv/config";
import { validateRequest } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";

export default async function Home() {
  // const { user } = await validateRequest();
  return (
    <main className="flex h-svh flex-col items-center justify-between p-24">
      <div className={" flex border border-black w-full h-full p-4"}>
        {/*left*/}
        <div
          className={" flex flex-col items-center justify-center w-full h-full"}
        >
          <div className={""}>
            <h1 className={" font-bold text-4xl "}>Realize o Login</h1>
            <div className={" font-normal text-xl text-[#71717A]"}>
              Seja bem vindo! Escolha seu método preferido:
            </div>
            <div
              className={
                " flex justify-center gap-5 mt-10 flex-col md:flex-row md:w-full"
              }
            >
              <Button size={"lg"} className={"w-full uppercase"}>
                <FcGoogle className={"mr-2 h-4 w-4"} />
                Google
              </Button>
              <Button size={"lg"} className={"w-full uppercase"}>
                <GrGithub className={"mr-2 h-full w-4"} />
                Github
              </Button>
            </div>
          </div>
        </div>
        {/*right*/}
        <div className={" bg-[#6172F3] w-full h-full hidden "}></div>
      </div>
    </main>
  );
}
