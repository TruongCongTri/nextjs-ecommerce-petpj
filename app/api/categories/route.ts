import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

// prisma client-side
export async function GET() {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}