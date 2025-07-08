import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { InvoiceStatus } from "@prisma/client";

// 1. Utility to reset database
async function resetDatabase() {
  await prisma.invoice.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.revenue.deleteMany({});
}

// 2. Utility to randomize invoice status
function getRandomStatus(): InvoiceStatus {
  return Math.random() < 0.5 ? "PAID" : "UNPAID";
}

// 3. Utility to randomize amount
function getRandomAmount(min = 100, max = 1000) {
  return faker.number.float({ min, max, multipleOf: 0.01 });
}

// 4. Utility to get a past date (within last 180 days)
function getRandomDate() {
  return faker.date.recent({ days: 180 }); // 6 months
}

export async function GET() {
  try {
    console.log("🌱 Seeding started...");
    await resetDatabase();

    const users = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: bcrypt.hashSync("password123", 10),
          },
        })
      )
    );

    for (const user of users) {
      const clients = await Promise.all(
        Array.from({ length: 5 }).map(() =>
          prisma.client.create({
            data: {
              name: faker.person.fullName(),
              email: faker.internet.email().toLowerCase(),
              userId: user.id,
            },
          })
        )
      );

      for (const client of clients) {
        const invoiceCount = faker.number.int({ min: 2, max: 6 });

        for (let i = 0; i < invoiceCount; i++) {
          const amount = getRandomAmount();
          const status = getRandomStatus();
          const createdAt = getRandomDate();
          const year = createdAt.getFullYear();
          const month = createdAt.getMonth() + 1; // month is 0-indexed

          await prisma.invoice.create({
            data: {
              clientId: client.id,
              amount,
              status,
              createdAt,
            },
          });

          if (status === "PAID") {
            await prisma.revenue.upsert({
              where: {
                month_year_userId: {
                  userId: user.id,
                  year,
                  month,
                },
              },
              update: {
                total: {
                  increment: amount,
                },
              },
              create: {
                userId: user.id,
                year,
                month,
                total: amount,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "🌱 Seeded users, clients, invoices, and revenue.",
      users,
    });
  } catch (err) {
    console.error("[SEED ERROR]", err);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
