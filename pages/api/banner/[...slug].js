import { connectDatabase, insertDocument, getAllDocuments } from "../../../utils/db-utils";

export default async function handler(req, res) {
    const slug = req.query.slug;
    if (req.method === 'GET') {
        const client = connectDatabase()

        // res.status(200).json({ comments: documents })

        let banner = {}
        if (data[slug]) {
            banner = data[slug]
        }
        res.status(200).json({ banner })
    }
}
