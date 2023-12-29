import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const payload: WebhookEvent = await req.json();

  console.log({ payload });
  return Response.json({ message: "Received" });
}
