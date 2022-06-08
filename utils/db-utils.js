import { MongoClient } from "mongodb"

export const connectDatabase = async (dbName='users') => {
    const client = await MongoClient.connect(`mongodb+srv://ddague:tiu88app@cluster0.eqmjz9q.mongodb.net/${dbName}?retryWrites=true&w=majority`);
    return client
}

export const insertDocument = async (client, collection, document) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort={}, filter = {}) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray()
    return documents;
}

