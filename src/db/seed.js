// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
// import { stadiumImages, stadiums, tickets } from "../lib/initialData";
const { stadiumImages, stadiums, tickets } = require("../lib/initialData");
const prisma = new PrismaClient();
const { ObjectId } = require("mongodb");

const crypto = require("crypto");
// const id = crypto.randomBytes(16).toString("hex");
const randomUUID = () => {
  return crypto.randomBytes(12).toString("hex");
}

async function main() {
  // await prisma.stadiumImage.deleteMany({});
  // await prisma.stadium.deleteMany({});
  // await prisma.ticket.deleteMany({});
  
  try {
    const createdEvent = await prisma.event.create({
      data: {
        id: randomUUID(),        
        title: "Test Event",
        description: "This is a test event",
        categoryId: "6635ef4bfdecbff0f6df1dfa",
        stadiumId: "66952e8e1719a5006a5a6966",
        price: 1000,
        date: new Date(),
        images: {
          createMany: {
            data: [
              {
                url: "public/generalAssets/footer.jpeg",
              },
            ],
          },
        },
      },
    });         
  } catch (error) {
    console.error(error);
  }

  // const createdStadiums = await prisma.stadium.createMany({
  //   data: stadiums,
  // });

  // const createdStadiumImages = await prisma.stadiumImage.createMany({
  //   data: stadiumImages
  // });

  // const createdTickets = await prisma.ticket.createMany({
  //   data: tickets,
  // });

  console.log("Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
