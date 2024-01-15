import { createOrUpdateUser, deleteUser } from "@/data/user";
import { verifyWebhook } from "@/lib/webhook";

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
    console.log("Session created:", { evt })
  }

  return new Response("Recieved", { status: 200 });
}

export async function GET() {
  return Response.json({ message: "API TEST" });
}
