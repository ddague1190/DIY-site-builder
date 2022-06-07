import fs from 'fs';
import path from "path";

const buildBannerPath = () => {
    return path.join(process.cwd(), 'data', 'banner.json');
}

const getBannerData = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    return JSON.parse(fileData);
}

export default function handler(req, res) {
    const data = getBannerData(buildBannerPath())

    if (req.method === 'POST') {
        const text = req.body.text;
        const source = req.body.source;
        const image = req.body.image;
        const route = req.body.route;
        const newBanner = {
            'route': {
                source,
                image,
                text
            }
        }
        const filePath = buildBannerPath();
        data.push(newBanner);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ result: 'Success', link: newLink })
    } else {
        res.status(200).json({ result: 'Not added' })
    }
}
