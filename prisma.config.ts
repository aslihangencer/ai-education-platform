import path from "node:path";
import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// Prisma v7: .env dosyasını açıkça yüklüyoruz
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
});
