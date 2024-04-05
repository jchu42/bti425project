
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
                if (category.Description == element.toLowerCase() || category.Description + "s" == element.toLowerCase()){
                    element = category.ID;
                    return true;
                }
                return false;
            })){
                newResults = searchResults.filter(result=>result.Categories.includes(element));
            }
            // price
            else if(/\d+/.test(element)){
                price = element.match(/\d+/)[0];
                if (element.includes("="))
                    newResults.push(...searchResults.filter(result=>result.Price == price));
                if (element.includes(">"))
                    newResults.push(...searchResults.filter(result=>result.Price > price));
                if (element.includes("<"))
                    newResults.push(...searchResults.filter(result=>result.Price < price));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Price - b.Price); // ascending order = lowest cost first
                    beenSorted = true;
                }
            }
            // name
            else if (searchResults.find(result=>result.Name.includes(element))){
                newResults = searchResults.filter(result=>result.Name.includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Name.search(element) - b.Name.search(element)); // lowest index found first
                    beenSorted = true;
                }
            }
            // description
            else if (searchResults.find(result=>result.Description.includes(element))){
                newResults = searchResults.filter(result=>result.Description.includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Description.search(element) - b.Description.search(element)); // lowest index found first
                    beenSorted = true;
                }
            }
            // id
            else if (searchResults.find(result=>result.Description.includes(element))){
                newResults = searchResults.filter(result=>result.ID == element);
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