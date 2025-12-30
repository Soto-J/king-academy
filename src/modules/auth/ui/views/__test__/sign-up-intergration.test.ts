import { describe, it, expect, afterEach } from "vitest";
import { auth } from "@/lib/auth/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { account, user } from "@/db/schema";

export const mockUser = {
  body: {
    email: "test@testing.com",
    password: "12345678",
    name: "John Doe",
  },
};

describe("signup authentication", () => {
  afterEach(async () => {
    await db.delete(user).where(eq(user.email, mockUser.body.email));
  });

  it.skip("creates user via email signup", async () => {
    const result = await auth.api.signUpEmail(mockUser);
    expect(result).toBeDefined();

    const createdData = await db
      .select()
      .from(user)
      .where(eq(user.email, mockUser.body.email))
      .leftJoin(account, eq(account.userId, user.id))
      .then((rows) => rows[0]);

    expect(createdData).toBeDefined();

    expect(createdData.user.email).toBe(mockUser.body.email);
    expect(createdData.user.name).toBe("John Doe");
    expect(createdData.account?.password).not.toBe("12345678"); // hashed
  });

  it.todo("creates user via google oath", async () => {
    const result = await auth.api.signInSocial({
      body: { provider: "google" },
      params: {
        id: "google-123",
        email: mockUser.body.email,
        name: "Google User",
        picture: "https://avatar.google",
      },
    });

    const created = await db
      .select()
      .from(user)
      .where(eq(user.email, mockUser.body.email))
      .leftJoin(account, eq(account.userId, user.id))
      .then((rows) => rows[0]);

    expect(created).toBeDefined();

    expect(created.user.email).toBe(mockUser.body.email);
    expect(created.user.name).toBe("Google User");

    expect(created.account).toBeDefined();
    expect(created.account?.providerId).toBe("google");
    expect(created.account?.password).toBeNull();
  });
});
