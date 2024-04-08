
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
            element = element.toLowerCase();

            // category - if is a category, change element to be the category id
            if (categories.find(category=>{
                if (category.Description == element || category.Description + "s" == element){
                    element = category.ID;
                    return true;
                }
                return false;
            })){
                console.log("filtering by category: ", element)
                newResults = searchResults.filter(result=>result.Categories.includes(element));
            }
            // id
            else if (searchResults.find(result=>result.ID.toLowerCase() == element)){
                console.log("filtering by id: ", element)
                newResults = searchResults.filter(result=>result.ID.toLowerCase() == element);
            }
            // price
            else if(/\d+/.test(element)){
                console.log("filtering by price: ", element)
                var price = element.match(/\d+/)[0];
                if (element.includes("="))
                    newResults.push(...searchResults.filter(result=>result.Price == price));
                if (element.includes(">"))
                    newResults.push(...searchResults.filter(result=>result.Price > price));
                else//if (element.includes("<"))
                    newResults.push(...searchResults.filter(result=>result.Price < price));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Price - b.Price); // ascending order = always lowest cost first
                    beenSorted = true;
                }
            }
            // name
            else if (searchResults.find(result=>result.Name.toLowerCase().includes(element))){
                console.log("filtering by name: ", element)
                newResults = searchResults.filter(result=>result.Name.toLowerCase().includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Name.toLowerCase().search(element) - b.Name.toLowerCase().search(element)); // lowest index found first
                    beenSorted = true;
                }
            }
            // description
            else if (searchResults.find(result=>result.Description.toLowerCase().includes(element))){
                console.log("filtering by description: ", element)
                newResults = searchResults.filter(result=>result.Description.toLowerCase().includes(element));

                if (!beenSorted && newResults.length > 0){
                    // sort
                    newResults.sort((a, b)=>a.Description.toLowerCase().search(element) - b.Description.toLowerCase().search(element)); // lowest index found first
                    beenSorted = true;
                }
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