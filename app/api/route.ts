import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const {id} = await req.json();
  const updatedCourse = await prisma.course.update({
    where: { id },
    data: { selected: true },
  });
  return NextResponse.json(updatedCourse);
}
