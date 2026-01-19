// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const cart = await req.json();
  const { items } = cart;
  const session = await getServerSession(authOptions);

  if (!Array.isArray(items) || items.length ===  0) {
    return NextResponse.json({ error: "No items"}, { status: 400});
  }

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 🔽 Find or create user
  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name ?? "",
        password: "", 
      },
    });
  }

  const total = items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      status: "Pending",
      user: {
        connectOrCreate: {
          where: { email: session.user.email! },
          create: {
            email: session.user.email!,
            name: session.user.name || "User",
          },
        },
      },
      items: {
        create: items.map((i: any) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      },
    },
  });  

  return NextResponse.json({ orderId: order.id });
}
