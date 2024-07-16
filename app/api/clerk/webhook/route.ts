import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { onUpsertUser } from "@/actions/upsert-user";
import { deleteUser } from "@/lib/action-helpers/user-service";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const evt = await validateRequest(req);

  if (!evt) {
    return new Response("Problem validating request", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    await onUpsertUser(evt.data);
  }

  if (eventType === "user.deleted") {
    await deleteUser(evt.data.id);
  }

  return new Response("Received", { status: 200 });
}

async function validateRequest(req: Request) {
  try {
    // Get headers
    const headerPayload = headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error("Missing svix headers");
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    return wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error verifying webhook:", error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log("Api Test");
    return Response.json({ message: "Api Test" });
  } catch (error) {
    return Response.json({ error: "Something went wrong." });
  }
}
