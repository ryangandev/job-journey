import { PrismaNeon } from '@prisma/adapter-neon';

import { PrismaClient } from '@/generated/prisma/client';

const prismaClientSingleton = () => {
  // Vercel Postgres (Neon): the runtime uses the pooled connection string.
  const adapter = new PrismaNeon({
    connectionString: process.env.POSTGRES_PRISMA_URL,
  });

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
