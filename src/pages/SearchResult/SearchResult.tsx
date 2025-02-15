import "./SearchResult.scss";
interface Result {
  name: string;
}
interface SearchResultProps {
  results: Result[];
}
const SearchResult = ({ results }: SearchResultProps) => {
  return (
    <article>
      <ul>
        {results.map((res, i: number) => (
          <li key={i}>{res.name}</li>
        ))}
      </ul>
    </article>
  );
};
export default SearchResult;
