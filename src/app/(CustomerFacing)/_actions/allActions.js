import db from "@/db/db";
import fs from "fs/promises";
import { ObjectId } from "mongodb";

export const getTicket = async (id) => {
 if (!id) {
    throw new Error("ID is required");
 }

 const ticket = await db.ticket.findUnique({
    where: {
      id: new ObjectId(id),
    },
    include: {
      stadium: true,
    }
 }); 

 return ticket;
}

export const getEventWithoutImages = async (id) => {
 if (!id) {
    throw new Error("ID is required");
 }

 const event = await db.event.findUnique({
    where: {
      id: new ObjectId(id),
    },
    include: {
      stadium: true,
    }
 });
 return event;
}

export const getSingleEvent = async (id) => {
 if (!id) {
    throw new Error("ID is required");
 }

 const event = await db.event.findUnique({
    where: {
      id: new ObjectId(id),
    },
    include: {
      images: true,
      stadium: true,
    },
 });
 return event;
};

export const getTicketsGroupedByPrice = async (stadiumId) => {
 if (!stadiumId) {
    throw new Error("Stadium ID is required");
 }

 const groupedtickets = await db.ticket.groupBy({
    by: ["price"],
    where: {
      stadiumId: new ObjectId(stadiumId),
    },
 });
 const ticketsForEachPrice = await Promise.all( 
    groupedtickets.map(async (ticket) => {
      const tickets = await db.ticket.findMany({
        where: {
          price: ticket.price,
          stadiumId: new ObjectId(stadiumId),
        }
      });
      return {price: ticket.price, tickets: [...tickets]};
    })
 );

 return ticketsForEachPrice;
};

export const getSingleStadium = async (id) => {
 if (!id) {
    throw new Error("ID is required");
 }

 const stadium = await db.stadium.findUnique({
    where: {
      id: new ObjectId(id),
    },
    include: {
      images: true,      
    },
 });
 return stadium;
};

export async function getAllCarouselImages() {
 let imageFiles = await fs.readdir("public/carouselImages");
 const imagePaths = imageFiles.map((file) => `/carouselImages/${file}`);
 return imagePaths;
}



// "use server";

// import db from "@/db/db";
// import fs from "fs/promises";
// import { ObjectId } from "mongodb";

// export const getTicket = async (id) => {
//   const ticket = await db.ticket.findUnique({
//     where: {
//       id,      
//     },
//     include: {
//       stadium: true,
//     }
//   }); 

//   return ticket;
// }

// export const getEventWithoutImages = async (id) => {
//   const event = await db.event.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       stadium: true,
//     }
//   });
//   return event;

// }

// export const getSingleEvent = async (id) => {
//   const event = await db.event.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       images: true,
//       stadium: true,
//     },
//   });
//   return event;
// };

// export const getTicketsGroupedByPrice = async (stadiumId) => {
//   console.log("stadiumId", stadiumId);
//   const groupedtickets = await db.ticket.groupBy({
//     by: ["price"],
//     where: {
//       stadiumId,
//     },
//   });
//   const ticketsForEachPrice = await Promise.all( 
//     groupedtickets.map(async (ticket) => {
//       const tickets = await db.ticket.findMany({
//         where: {
//           price: ticket.price,
//           stadiumId,
//         }
//       });
//       return {price: ticket.price, tickets: [...tickets]};
//     })
//   );

//   return ticketsForEachPrice;
// };

// export const getSingleStadium = async (id) => {
//   const stadium = await db.stadium.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       images: true,      
//     },
//   });
//   return stadium;
// };

// export async function getAllCarouselImages() {
//   let imageFiles = await fs.readdir("public/carouselImages");
//   const imagePaths = imageFiles.map((file) => `/carouselImages/${file}`);
//   return imagePaths;
// }
