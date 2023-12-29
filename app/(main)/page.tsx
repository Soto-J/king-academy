import { auth, currentUser } from "@clerk/nextjs";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const { sessionId, userId } = auth();
  // const current = await currentUser();

  // const test = auth();

  // console.log({ test });
  // console.log({ current });
  // console.log(current?.emailAddresses);
  // console.log(current?.phoneNumbers[0].phoneNumber);

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
