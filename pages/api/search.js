import {promises as fs} from 'fs';

const file = await fs.readFile(process.cwd() + "/pages/api/data.json", "utf8");
const data = JSON.parse(file);

export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' });


    const { search } = req.query;
    //const { name } = req.body;
    const { method } = req;

    switch (method) {
    case 'GET':
        // start with array with all elements
        // for each search.split(" ") index, apply search filter to cut down results
        // sorts results based on query as well - leftmost takes precedence - therefore do filters and sorts right to left
        // then return end result

        // get all elements
        var copy = JSON.parse(JSON.stringify(data))
        var searchResults = copy.places; // https://raddevon.com/articles/copy-javascript-object/
        var categories = copy.categories;
        // searchResults is now just an array of datas
        console.log (searchResults);
        var searchElements = search.split(" ");
        searchElements.reverse().forEach (element=>{
            // searches:
            //  if is a category, only look in category
            //  if is number, or has "<" or "<$" or "<=" or "<=$" before it, search for price < number
            //  other search queries search name and descriptions, prioritizing names
            // number:number = a time; see if is in ranges of times of operation(?)
            
            // determine type of search and filter to do based on element text
            // then do that search and filter (array.filter(element=>{condition?}))?
        })
        res.status(200).json({ message: searchResults});
        break;
    default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}