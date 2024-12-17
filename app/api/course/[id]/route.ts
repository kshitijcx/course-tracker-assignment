import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest,{params}) {
  const { id } = await params;
  const searchId = Number(id)
  const questions = await prisma.question.findUnique({ where: { id:searchId } });
  console.log(questions)
  return NextResponse.json(questions);
}
