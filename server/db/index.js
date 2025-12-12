// import Prisma from "@prisma/client"
import { PrismaClient } from "../../app/generated/prisma/client";

// const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export { prisma };
