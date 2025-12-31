import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local or .env'
  );
}

// Shape of the cached connection stored on the global object
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  // Allow TypeScript to recognize the global cache across modules and reloads
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Use a global cache to prevent creating multiple connections during hot reloads
const cache: MongooseCache = globalThis._mongooseCache ?? (globalThis._mongooseCache = {
  conn: null,
  promise: null,
});

/**
 * Connect to MongoDB using Mongoose and cache the connection.
 * Returns the connected Mongoose instance.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If an existing connection is cached, return it immediately
  if (cache.conn) {
    return cache.conn;
  }

  // If a connection is in progress, reuse its promise
  if (!cache.promise) {
    const opts: mongoose.ConnectOptions = {
      // Avoid buffering commands when disconnected (safer in serverless environments)
      bufferCommands: false,
      // Additional options can be added here if needed. Mongoose defaults are sensible.
    };

    // Store the connect promise so concurrent calls reuse it
    cache.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      cache.conn = mongooseInstance;
      return mongooseInstance;
    });
  }

  return cache.promise;
}

/**
 * Disconnects the mongoose connection and clears the cache.
 * Useful for tests or graceful shutdown logic.
 */
export async function disconnectDatabase(): Promise<void> {
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}

export default connectToDatabase;
