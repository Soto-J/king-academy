import { createOrUpdateUser, deleteUser, getUserProfile } from "@/data/user";
import { verifyWebhook } from "@/lib/webhook";
import { clerkClient } from "@clerk/nextjs";

export async function POST(request: Request) {
  const evt = await verifyWebhook(request);

  if (evt.type === "user.created" || evt.type === "user.updated") {
    console.log("User created or updated");

    await createOrUpdateUser(evt.data);
  }

  if (evt.type === "user.deleted") {
    await deleteUser(evt.data.id);
  }

  if (evt.type === "session.created") {
    console.log("Session created:", { evt });

    // const profile = await getUserProfile(evt.data.id);

    // const hasProfile = !!profile?.id;

    // await clerkClient.users.updateUserMetadata(evt.data.user_id, {
    //   publicMetadata: { hasProfile },
    // });
  }

  return new Response("Recieved", { status: 200 });
}

export async function GET() {
  return Response.json({ message: "API TEST" });
}
