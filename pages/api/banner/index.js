import { connectDatabase, insertDocument, getAllDocuments } from "../../../utils/db-utils";

export default async function handler(req, res) {
    const client = await connectDatabase('banner')


    if (req.method === 'POST') {
        const text = req.body.text;
        const source = req.body.source;
        const image = req.body.image;
        const route = req.body.route.slice(1).split("/");

        const newBanner = {
            source,
            image,
            text,
            route: route[0]
        }
        const result = await insertDocument('banner', newBanner);

        db.collection('banner').insertOne(newBanner);

        res.status(201).json({ result: 'Success' })
    } else {
        try {
            const documents = await getAllDocuments(client, 'banner')
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Getting banners failed' })
            return;
        }
        res.status(200).json({ result: documents })
    }
}
