// import EventCard from '@/components/EventCard'
// import ExploreBtn from '@/components/ExploreBtn'
// import { IEvent } from '@/database';
// import events from '@/lib/constants'
// import { cacheLife } from 'next/cache';
// import React from 'react'

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const page = async () => {
//   'use cache';
//   cacheLife('hours')
//   const response = await fetch(`${BASE_URL}/api/events`);
//   const { events } = await response.json();
//   return (
//     <section>
//       <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss </h1>
//       <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>

//       <ExploreBtn/>

//       <div className='mt-20 space-y-7'>
//         <h3>Featured Events</h3>

//         <ul className='events'>
//           {events && events.length > 0 ? (
//             events.map((event: IEvent) => (
//               <li className='list-none' key={event.title}>
//                 <EventCard { ...event} />
//               </li>
//             ))
//           ) : (
//             <p>No events available.</p>
//           )}
//         </ul>
//       </div>
//     </section>
//   )
// }

// export default page

import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database'; // Ensure this path is correct for your interface
import { cacheLife } from 'next/cache';
import React from 'react'
import connectToDatabase from '@/lib/mongodb'; // Import connection logic
import Event from '@/database/event.model'; // Import the Event model

const page = async () => {
  'use cache';
  cacheLife('hours')

  // --- REPLACED FETCH WITH DIRECT DB CALL ---
  
  // 1. Connect to the database directly
  await connectToDatabase();

  // 2. Query the database
  // .lean() makes it faster by returning plain objects instead of Mongoose docs
  // .sort({ createdAt: -1 }) shows newest events first
  const eventsRaw = await Event.find().sort({ createdAt: -1 }).lean();

  // 3. Serialize the data
  // (Converts special MongoDB objects like Dates/_id to strings for Next.js)
  const events = JSON.parse(JSON.stringify(eventsRaw));

  // ------------------------------------------

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss </h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>

      <ExploreBtn/>

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        <ul className='events'>
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              // Use _id for the key if available, otherwise fallback to title
              <li className='list-none' key={event.title}>
                <EventCard { ...event} />
              </li>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </ul>
      </div>
    </section>
  )
}

export default page