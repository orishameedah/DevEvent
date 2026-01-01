// 'use server';

// import Event from "@/database/event.model";
// import connectToDatabase from "../mongodb";

// export const getSimilarEventsBySlug = async (slug: string) => {
//     try{
//         await connectToDatabase();

//         const event = await Event.findOne({ slug });
//         return await Event.find({slug: { $ne: slug },  tags: { $in: event.tags },}).limit(3);

//         // Event.find({ _id: { $ne: event._id}, tags: { $in: event.tags } }).lean();
        
//     } catch{
//         return [];
//     }
// }

'use server';

import Event from '@/database/event.model';
import connectToDatabase from '../mongodb';

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ slug }).lean();
    if (!event || !Array.isArray(event.tags)) return [];

    const similarEvents = await Event.find({
      slug: { $ne: slug },
      tags: { $in: event.tags },
    })
      .limit(3)
      .lean();

    return similarEvents;
  } catch {
    return [];
  }
};
