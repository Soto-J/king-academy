import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { Position } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return "User not found";
    }

    const phoneNumbers = user.phoneNumbers.map(
      (phoneNumber) => phoneNumber.phoneNumber,
    );

    const userToUpdate = await prisma.user.findFirst({
      where: {
        phoneNumbers: {
          hasEvery: phoneNumbers,
        },
      },
    });

    if (!userToUpdate) {
      return "User not found";
    }

    const data = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userToUpdate.id },
      data: {
        school: data.school,
        address: data.address,
        positions: data.position as Position[],
        batting: data.batting,
        throwing: data.throwing,
        bio: data.bio,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
