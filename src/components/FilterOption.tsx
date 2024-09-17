interface FilterOptionProps {
  filterOption: string;
  setFilterOption: (option: string) => void;
}


const FilterOption = ({ filterOption, setFilterOption }: FilterOptionProps) => {
  return (
    <div className="container-filter">
      <select
        id="filter"
        className="select-filter"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option value="all">All Users</option>
        <option value="active">Active Users</option>
        <option value="inactive">Inactive Users</option>
        <optgroup label="Position">
          <option value="Software Engineer">Software Engineer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Project Manager">Project Manager</option>
        </optgroup>
      </select>
    </div>
  );
};

export default FilterOption;