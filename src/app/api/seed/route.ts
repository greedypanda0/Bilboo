import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { InvoiceStatus } from "@prisma/client";

async function resetDatabase() {
  await prisma.invoice.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.revenue.deleteMany({});
}

function getRandomStatus(): InvoiceStatus {
  const statuses: InvoiceStatus[] = [InvoiceStatus.PAID, InvoiceStatus.UNPAID];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomAmount(min = 100, max = 1000) {
  return faker.number.float({ min, max, multipleOf: 0.01 });
}

export async function GET() {
  try {
    console.log("🌱 Seeding started...");
    await resetDatabase();

    const users = await Promise.all(
      Array.from({ length: 10 }).map(async () =>
        prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: await bcrypt.hash("password123", 10),
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

          await prisma.invoice.create({
            data: {
              clientId: client.id,
              amount,
              status,
            },
          });

          // If the invoice is PAID, track it in revenue
          if (status === "PAID") {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Month is 0-indexed

            // Upsert revenue for current year+month+user
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
      message: "Seeded: users, clients, invoices, and revenue.",
    });
  } catch (err) {
    console.error("[SEED ERROR]", err);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
