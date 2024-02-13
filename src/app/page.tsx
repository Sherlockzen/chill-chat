import "dotenv/config";
import { validateRequest } from "@/server/auth";

export default async function Home() {
  const { user } = await validateRequest();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-5xl">starting</div>
      {user && <div>Usuario logado: {user.email}</div>}
    </main>
  );
}
