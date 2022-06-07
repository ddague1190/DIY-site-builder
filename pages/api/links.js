import fs from 'fs';
import path from "path";


export const buildLinkPath = () => {
  return path.join(process.cwd(), 'data', 'links.json');
}

export const extractLinkData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}
export default function handler(req, res) {
  const filePath = buildLinkPath()
  const data = extractLinkData(filePath);

  if (req.method === 'POST') {
    const link = req.body.link;
    const slug = '/' + req.body.slug;
    const newLink = {
      link,
      slug
    }
    if (!data.find((el) => {
      return (
        el.link === link || el.slug === slug)
    })) {
      data.push(newLink);
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ result: 'Success', links: data })
  } else {

    res.status(200).json({ links: data })
  }
}
