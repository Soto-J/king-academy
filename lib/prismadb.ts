import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = client;
// }

// export default client;
