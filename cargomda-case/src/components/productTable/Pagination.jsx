import PropTypes from "prop-types";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const Pagination = ({
  pageOptions,
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  gotoPage,
  pageCount,
  setPageSize,
  state: { pageIndex, pageSize },
}) => {
  return (
    <div className="d-flex justify-content-around align-items-center mt-3 flex-wrap gap-3 bg-light py-4 px-2 rounded border">

      <div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="form-select"
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      
      <div className="d-flex flex-row align-items-center">

        <div className="d-flex align-items-center">
          <span>Go to page:</span>{" "}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
            className="form-control ms-2 me-4"
          />
        </div>

        <div className="">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="btn btn-primary"
        >
          <BsChevronDoubleLeft size={20} />
        </button>{" "}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-primary"
        >
          <BsChevronLeft size={20} />
        </button>{" "}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-primary"
        >
          <BsChevronRight size={20} />
        </button>{" "}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn btn-primary"
        >
          <BsChevronDoubleRight size={20} />
        </button>{" "}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  gotoPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  state: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
  }).isRequired,
};
export default Pagination;
