import { auth } from "@clerk/nextjs";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const { sessionId, userId } = auth();

  if (sessionId) {
    const user = await getUser(userId);

    if (!user) {
      return redirect("/profile");
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h2>Welcome</h2>
    </div>
  );
}
