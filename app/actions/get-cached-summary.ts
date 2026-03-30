"use server";
import { prisma } from "@/lib/prisma";

export async function getCachedSummary(contentHash: string) {
  // Prisma v7: Deprecated olmayan temiz sorgu
  const cached = await prisma.aICache.findUnique({
    where: { hash: contentHash }
  });

  if (cached && cached.expiresAt > new Date()) {
    return cached.summary;
  }
  return null;
}
