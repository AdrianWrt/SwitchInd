import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Headphones",
        price: 59,
        image: "/products/headphones.jpg",
        description: "High-quality sound for everyday use.",
      },
      {
        name: "Keyboard",
        price: 89,
        image: "/products/keyboard.jpg",
        description: "Mechanical keyboard with RGB lighting.",
      },
      {
        name: "Mouse",
        price: 39,
        image: "/products/mouse.jpg",
        description: "Ergonomic mouse for productivity and gaming.",
      },
    ],
  });

  console.log("Products seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
