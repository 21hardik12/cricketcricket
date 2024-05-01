import EventCard from "./EventCard";

export default async function CardsGridSection({ eventsFetcher }) {
  const events = await eventsFetcher();

  return (
    <div className="flex flex-col">
      <div className="text-center mt-2 text-2xl font-bold mb-4">Ongoing Sports Events</div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}