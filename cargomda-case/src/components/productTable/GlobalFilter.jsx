import PropTypes from "prop-types";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="form-floating">
      <input
        type="text"
        value={filter || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="form-control"
        id="floatingInput"
        placeholder="Search"
      />
      <label htmlFor="floatingInput" className="">Search</label>
    </div>
  );
};

GlobalFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
