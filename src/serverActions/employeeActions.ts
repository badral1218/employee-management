import type { Employee } from "#/generated/prisma/client";
import { prisma } from "#/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const addEmployee = createServerFn({ method: "POST" })
  .validator((data: Employee) => data)
  .handler(async ({ data }) => {
    try {
      await prisma.employee.create({ data: data });
      return { success: true, message: "Successfully inserted" };
    } catch (error) {
        throw new Error((error as Error).message)
    }
  });
