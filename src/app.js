
import {useAtom} from 'jotai';
import {dataAtom, errorAtom} from './store.js';

export default function App() {
    /*
    "All of your store’s dynamic content will be written in JavaScript in the `src/app.js` file. 
    Using JS, you can display the product/service data from a JS array into a proper format on the page (like using table)" 
    */

    const [searchResults, setSearchResults] = useAtom(dataAtom);
    const [error, setError] = useAtom(errorAtom);
    
    return (
        <div>
        {
            (error || searchResults.length == 0)
            ?
            <>Sorry, it looks like search is not working at this time.</>
            :
            <>{searchResults.map((result, index)=>{
                // https://sentry.io/answers/unique-key-prop/

                // CARD STUFF HERE!!!
                return <span key={index}>Name: {result.Name}, Price: {result.Price}<br/></span>
            })}</>
        }
        </div>
    );
}