// src/global.d.ts
import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

// Ensure this file is treated as a module
export {};
