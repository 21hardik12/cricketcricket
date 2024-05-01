import db from "@/db/db";
import {getAllCarouselImages} from "./_actions/allActions";
import EventCarousel from "./_components/EventCarousel";
import CardsGridSection from "./_components/CardsGridSection";
const getAllEvents = async () => {
  const events = await db.event.findMany({
    include: {
      images: true,
      stadium: true,
    },
    orderBy: {
      date: "asc",
    },
  })
  
  return events;
}

export default async function HomePage() {  
  const imagePaths = await getAllCarouselImages();
  return (
    <main>        
        <EventCarousel images={imagePaths} />
        <CardsGridSection eventsFetcher={getAllEvents}/>
    </main>
  );
}








