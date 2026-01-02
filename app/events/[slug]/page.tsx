// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import React from 'react'
// import BookEvent from '@/components/BookEvent';
// import { IEvent } from '@/database';
// import { getSimilarEventsBySlug } from '@/lib/actions/events.actions';
// import EventCard from '@/components/EventCard';
// import { cacheLife } from 'next/cache';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const parseArray = (value: unknown): string[] => {
//   if (!Array.isArray(value)) return [];
//   try {
//     return JSON.parse(value[0]);
//   } catch {
//     return value as string[];
//   }
// };


// const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
//       <div className='flex-row-gap-2 items-center'>
//     <Image src={icon} alt={alt} width={17} height={17}/>
//     <p>{label}</p>
//   </div>
//   )


// const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
//   <div className='agenda'>
//     <h2>Agenda</h2>
//     <ul>
//       {agendaItems.map((item) => (
//         <li key={item}>{item}</li>
//       ))}
//     </ul>
//   </div>
// )

// const EventTags = ({ tags }: { tags: string[] }) => (
//   <div className='flex flex-row gap-1.5 flex-wrap '>
//     {tags.map((tag) => (
//       <div key={tag} className='pill'>{tag}</div>
//     ))}
//   </div>
// )


// const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
//   'use cache'
//   cacheLife('hours')
//   const { slug } = await params;

//   // 1. Fetch the data
//   const request = await fetch(`${BASE_URL}/api/events/${slug}`);
//   const data = await request.json();

//   // 2. Create the 'event' variable explicitly
//   const event = data.event; 

//   // 3. Now you can safely destructure the properties from that variable
//   const { description, image, organizer, overview, date, time, location, mode, agenda, audience, tags } = event;

//   if (!description) return notFound();

//   const bookings = 10;
//   const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

//   return (
//     <section id='event'>
//       <div className='header'>
//         <h1>Event Description</h1>
//         <p className='mt-2'>{description}</p>
//       </div>

//       <div className='details'>
//         {/* left side - Event Content */}
//         <div className='content'>
//           <Image src={image} alt="Event Banner" width={800} height={800} className='banner'/>

//           <section className='flex-col-gap-2'>
//             <h2>Overview</h2>
//             <p>{overview}</p>
//           </section>

//           <section className='flex-col gap-2'>
//             <h2>Event Details</h2>
//             <EventDetailItem icon="/icons/calendar.svg" alt="Date" label={date} />
//             <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
//             <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
//             <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
//             <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
//           </section>

//           <EventAgenda agendaItems={parseArray(agenda)} />

//           <section className='flex-col-gap-2'>
//             <h2>About the Organizer</h2>
//             <p>{organizer}</p>
//           </section>

//           <EventTags tags={parseArray(tags)} />
//         </div>

//         {/* right side - Booking Form */}
//         <aside className='booking'>
//           <div className='signup-card'>
//             <h2>Book Your Spot</h2>
//             {bookings > 0 ? (
//               <p className='text-sm'>
//                 Join {bookings} people who have already booked their spot for this event!
//               </p>
//             ):(
//               <p className='text-sm'>Be the first to book your spot</p>
//             )}

//             {/* Now 'event' exists, so this line will work perfectly */}
//             <BookEvent eventId={event._id || event.id} slug={event.slug} />
//           </div>
//         </aside>
//       </div>

//       <div className='flex w-full flex-col gap-4 pt-20'>
//         <h2>Similar Events</h2>
//         <div className='events'>
//           {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
//             <EventCard key={similarEvent.title} { ...similarEvent} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default EventDetailsPage


import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import BookEvent from '@/components/BookEvent';
import { IEvent } from '@/database'; // Verify this path matches your interface location
import { getSimilarEventsBySlug } from '@/lib/actions/events.actions';
import EventCard from '@/components/EventCard';
import { cacheLife } from 'next/cache';
import connectToDatabase from '@/lib/mongodb'; // Ensure path is correct
import Event from '@/database/event.model';       // Ensure path is correct

// Helper to parse stringified arrays (from your original code)
const parseArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  try {
    return JSON.parse(value[0]);
  } catch {
    return value as string[];
  }
};

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
  <div className='flex-row-gap-2 items-center'>
    <Image src={icon} alt={alt} width={17} height={17}/>
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className='agenda'>
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className='flex flex-row gap-1.5 flex-wrap '>
    {tags.map((tag) => (
      <div key={tag} className='pill'>{tag}</div>
    ))}
  </div>
);

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  'use cache';
  cacheLife('hours');
  
  const { slug } = await params;

  // --- REPLACED FETCH WITH DIRECT DB CALL ---
  
  // 1. Connect to DB
  await connectToDatabase();

  // 2. Query DB directly (No URL needed)
  // .lean() converts the Mongoose document to a plain JavaScript object
  const eventRaw = await Event.findOne({ slug }).lean();

  if (!eventRaw) return notFound();

  // 3. Serialize data (Next.js needs simple JSON, this handles Dates and _id)
  const event = JSON.parse(JSON.stringify(eventRaw));

  // ------------------------------------------

  // Destructure from the direct event object
  const { description, image, organizer, overview, date, time, location, mode, agenda, audience, tags } = event;

  const bookings = 10;
  
  // Note: Ensure getSimilarEventsBySlug also uses direct DB calls if possible, 
  // otherwise it might still cause issues if it uses fetch internally.
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id='event'>
      <div className='header'>
        <h1>Event Description</h1>
        <p className='mt-2'>{description}</p>
      </div>

      <div className='details'>
        {/* left side - Event Content */}
        <div className='content'>
          <Image src={image} alt="Event Banner" width={800} height={800} className='banner'/>

          <section className='flex-col-gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className='flex-col gap-2'>
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="Date" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="Time" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="Location" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="Mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="Audience" label={audience} />
          </section>

          <EventAgenda agendaItems={parseArray(agenda)} />

          <section className='flex-col-gap-2'>
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={parseArray(tags)} />
        </div>

        {/* right side - Booking Form */}
        <aside className='booking'>
          <div className='signup-card'>
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className='text-sm'>
                Join {bookings} people who have already booked their spot for this event!
              </p>
            ):(
              <p className='text-sm'>Be the first to book your spot</p>
            )}

            <BookEvent eventId={event._id || event.id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className='flex w-full flex-col gap-4 pt-20'>
        <h2>Similar Events</h2>
        <div className='events'>
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCard key={similarEvent.title} { ...similarEvent} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage;