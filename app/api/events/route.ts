import  Event  from "@/database/event.model";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
// Create new event
export async function POST(req: NextRequest){
    try {
        await connectToDatabase();

        const formData = await req.formData(); // Get the form data from the request

        let event;
        
        try {
            event = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
        } catch (e) {
            // console.error("Error parsing form data:", e);
            return NextResponse.json({ message: "Invalid JSON data format", status: 400 });
        }

        const file = formData.get("image") as File;

        if (!file) return NextResponse.json({ message: "Image file is required"}, {status: 400 });

        let tags = JSON.parse(formData.get("tags") as string);
        let agenda = JSON.parse(formData.get("agenda") as string);

        const arrayBuffer = await file.arrayBuffer();   
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image', folder: 'DevEvent'}, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }).end(buffer);
        })

        event.image = (uploadResult as {secure_url: string}).secure_url;
        const createdEvent = await Event.create({
            ...event,
            tags: tags,
            agenda: agenda, 
        }); // Create the event in the database
        return NextResponse.json({ message: "Event Created Successfully", event: createdEvent }, {status: 201});
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Event Creation Failed", error: e  instanceof Error ? e.message : 'Unknown' }, {status: 500});
    }
}

// Fetch all events
export async function GET() {
    try {
        await connectToDatabase();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json({message: "Events fetched successfully", events }, {status: 200});
    } catch (e) {
        return NextResponse.json({ message: "Event Fetching Failed" }, {status: 500});
    }
}

// Fetch events by slug 
// a route that accepts slug as input instead of id -> returns event details
// which looks like this: /events/nextjs-conf-2024 (using slug) not /events/648a1f2e5b4c3a0012345678 (using id)