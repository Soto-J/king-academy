"use server";

import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";



export async function getAllPlayers() {
  try {
    return await prisma.user.findMany({
      include: { address: true, positions: true },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
