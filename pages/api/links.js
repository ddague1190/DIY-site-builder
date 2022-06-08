import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument,getAllDocuments } from "../../utils/db-utils";

export default async function handler(req, res) {
  let client;

  if (req.method === 'POST') {
    const link = req.body.link;
    const slug = '/' + req.body.slug;
    const newLink = {
      link,
      slug
    }

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return;
    }

    try {
      await insertDocument(client, 'collection', newLink)
      client.close()
    } catch (error) {
      res.status(500).json({ message: error.message })
      return;
    }

    res.status(201).json({ message: 'Link added', link: [newLink] })
  } else {
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' })
      return;
    }
    try {
      const documents = await getAllDocuments(client, 'links')
      client.close()

    } catch (error) {
      res.status(500).json({ message: 'Retrieving the links failed!' })
    }
    res.status(201).json({ links: data })
  }
}
