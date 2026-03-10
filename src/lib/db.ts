import { PrismaClient } from "@prisma/client";

// Reuse one client during dev hot-reloads
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
