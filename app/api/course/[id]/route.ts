import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }) {
  const { id } = await params;
  const searchId = Number(id);
  const questions = await prisma.question.findUnique({
    where: { id: searchId },
  });
  const answers = await prisma.answer.findUnique({ where: { id: searchId } });
  return NextResponse.json({ questions, answers });
}

export async function POST(req: NextRequest, { params }) {
  const { id } = await params;
  const searchId = Number(id);
  const data = await req.json();
  await prisma.course.update({
    where: { id: searchId },
    data: {
      progress: data.progress,
      score: data.score,
    },
  });
  await prisma.answer.upsert({
    create: {
      id: searchId,
      answers: data.selectedAnswers,
    },
    where: { id: searchId },
    update: {
      answers: data.selectedAnswers,
    },
  });
  return NextResponse.json("done");
}
