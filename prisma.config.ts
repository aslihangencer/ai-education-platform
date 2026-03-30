import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";
dotenv.config();

console.log("DIRECT_URL from dotenv:", process.env.DIRECT_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL as string,
  },
});
