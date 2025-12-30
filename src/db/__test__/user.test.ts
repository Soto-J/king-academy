import { db } from "@/db";
import { expect, it, vi } from "vitest";
import { user } from "@/db/schema";
import { nanoid } from "nanoid";

vi.mock()

it("creates user in database on signup", async () => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    }),
  });
  const newUser = {
    id: nanoid(),
    name: "",
    email: "testing@test.com",
  };

  db.insert(user).values(newUser);

  //   const user = await db.query.users.findFirst({
  //     where: eq(users.email, "test@example.com"),
  //   });

  //   expect(user).toBeDefined();
});
