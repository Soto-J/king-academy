import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { createUser } from "@/app/actions/createUser";
import { updateUser } from "@/app/actions/updateUser";
import { deleteUser } from "@/app/actions/deleteUser";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const evt = await validateRequest(req);

  if (!evt) {
    return new Response("Problem validating request", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created": {
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

      console.log("User Created:", evt);
      await createUser(evt.data);
      break;
    }
    case "user.updated": {
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

      await updateUser(evt.data);
      break;
    }
    case "user.deleted": {
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
      await deleteUser(evt.data.id);
      break;
    }
    case "session.created": {
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
      break;
    }
    default: {
      break;
    }
  }

  return new Response("Received", { status: 200 });
}

async function validateRequest(req: Request) {
  try {
    const headerPayload = headers();
    const wh = new Webhook(WEBHOOK_SECRET);

    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error("Missing svix headers");
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    return wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error verifying webhook:", error);
  }
}

export async function GET() {
  console.log("Api Test");
  return Response.json({ message: "Api Test" });
}
