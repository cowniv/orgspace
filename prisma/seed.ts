import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const inDays = (d: number, hour = 13) => {
  const date = new Date();
