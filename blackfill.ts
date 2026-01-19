import { prisma } from "./src/lib/prisma";

async function main() {
  // Backfill OrderItem.name and price from Product
  const orderItems = await prisma.orderItem.findMany({ include: { product: true } });
  for (const item of orderItems) {
    await prisma.orderItem.update({
      where: { id: item.id },
      data: {
        name: item.product.name,
        price: item.product.price,
      },
    });
  }

  // Backfill Product.updatedAt
  const products = await prisma.product.findMany();
  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: { updatedAt: new Date() },
    });
  }

  console.log("Backfill complete");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });