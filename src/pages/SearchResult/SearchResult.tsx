import { Link } from "react-router-dom";
import "./SearchResult.scss";
interface Result {
  name: string;
}
interface SearchResultProps {
  results: Result[];
  query: string;
}
const SearchResult = ({ results, query }: SearchResultProps) => {
  return (
    <article>
      <Link to="/place-search-more-details" state={{ query: query }}>
        <button>Click to see more details</button>
      </Link>
      <ul>
        {results.map((res, i: number) => (
          <li key={i}>{res.name}</li>
        ))}
      </ul>
    </article>
  );
};
export default SearchResult;
