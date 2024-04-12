import getSearch from "../../search.js"

// https://nextjs-faq.com/fetch-api-in-rsc

export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' });


    const { search } = req.query;
    //const { name } = req.body;
    const { method } = req;

    switch (method) {
    case 'GET':
        
        res.status(200).json({message: getSearch(search)});
        break;
    default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}