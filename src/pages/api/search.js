
import places from "../../places.js"
import categories from "../../categories.js"

export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' });


    const { search } = req.query;
    //const { name } = req.body;
    const { method } = req;

    switch (method) {
    case 'GET':
        var searchResults = places; 

        var searchElements = search.split(" ");
        var beenSorted = false;

        searchElements.forEach (element=>{
            var newResults = [];

            // category - if is a category, change element to be the category id
            if (categories.find(category=>{
                if (category.description == element.toLowerCase() || category.description + "s" == element.toLowerCase()){
                    element = category.id;
                    return true;
                }
                return false;
            })){
                newResults = searchResults.filter(result=>result.categories.includes(element));
            }
            // price
            else if(/\d+/.test(element)){
                price = element.match(/\d+/)[0];
                if (element.includes("="))
                    newResults.push(...searchResults.filter(result=>result.price == price));
                if (element.includes(">"))
                    newResults.push(...searchResults.filter(result=>result.price > price));
                if (element.includes("<"))
                    newResults.push(...searchResults.filter(result=>result.price < price));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.price - b.price); // ascending order = lowest cost first
                    beenSorted = true;
                }
            }
            // name
            else if (searchResults.find(result=>result.name.includes(element))){
                newResults = searchResults.filter(result=>result.name.includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.name.search(element) - b.name.search(element)); // lowest index found first
                    beenSorted = true;
                }
            }
            // description
            else if (searchResults.find(result=>result.description.includes(element))){
                newResults = searchResults.filter(result=>result.description.includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.description.search(element) - b.description.search(element)); // lowest index found first
                    beenSorted = true;
                }
            }
            // id
            else if (searchResults.find(result=>result.description.includes(element))){
                newResults = searchResults.filter(result=>result.id == element);
            }

            // if search element results in search results being empty, don't apply that search element
            if (newResults.length > 0)
                searchResults = newResults;
        })
        res.status(200).json({message: searchResults});
        break;
    default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}