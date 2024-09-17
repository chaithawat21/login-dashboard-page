import searchIcon from "../assets/dashboard/search.svg";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className="container-search">
      <img src={searchIcon} alt="search" className="img-search" />
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input-search"
      />
    </div>
  );
}

export default Search;
