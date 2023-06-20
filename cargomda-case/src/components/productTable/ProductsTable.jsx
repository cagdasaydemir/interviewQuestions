import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./columns";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsArrowDownShort,
  BsArrowUpShort,
} from "react-icons/bs";
import { GlobalFilter } from "./GlobalFilter";
import api from "../../api/api";
import DeleteProductModal from "../modals/produtcs/deleteProductModal/DeleteProductModal";
import CreateProductModal from "../modals/produtcs/createProductModal/CreateProductModal";
import UpdateProductModal from "../modals/produtcs/updateProductModal/UpdateProductModal";

const ProductsTable = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateProduct, setUpdateProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState();

  const [products, setProducts] = useState([]);

  const retrieveProducts = async () => {
    const response = await api.get("/products");
    return response.data;
  };
  const getAllProducts = async () => {
    const allProducts = await retrieveProducts();
    if (allProducts) setProducts(allProducts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const columns = useMemo(() => {
    return COLUMNS.map((column) => ({
      ...column,
      Cell: ({ value }) => (
        <div style={{ textAlign: column.type === "number" ? "right" : "left" }}>
          {value}
        </div>
      ),
    }));
  }, []);

  const data = useMemo(() => products, [products]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const renderTableHeaders = () => {
    return headerGroups.map((headerGroup, i) => (
      <tr key={i} {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column, i) =>
          column.Header === "Actions" ? (
            <th key={i} className={"text-end"}>
              {column.render("Header")}
            </th>
          ) : (
            <th
              key={i}
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className={column.type === "number" ? "text-end" : ""}
            >
              {column.render("Header")}

              <span>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <BsArrowUpShort size={20} />
                  ) : (
                    <BsArrowDownShort size={20} />
                  )
                ) : (
                  ""
                )}
              </span>
            </th>
          )
        )}
      </tr>
    ));
  };

  const renderTableRows = () => {
    return page.map((row, i) => {
      prepareRow(row);
      return (
        <tr key={i} {...row.getRowProps()}>
          {row.cells.map((cell, i) => (
            <td key={i} {...cell.getCellProps()}>
              {cell.column.Header === "Actions" ? (
                <div className="d-flex justify-content-end ms-3 align-items-center">
                  <button
                    type="button"
                    className="btn btn-light  me-2 text-warning "
                    onClick={() => {
                      setShowUpdateModal(true);
                      setUpdateProduct(row.original);
                    }}
                  >
                    <BsFillPencilFill size={18} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-light text-danger"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDeleteProduct(row.original);
                    }}
                  >
                    <BsFillTrashFill size={20} />
                  </button>
                </div>
              ) : (
                cell.render("Cell")
              )}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="d-flex  justify-content-between my-4 bg-light py-2 px-2 rounded border">
        {" "}
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          Add Product
        </button>
      </div>
      <div className="py-4 px-4 rounded border overflow-x-auto">
        <table {...getTableProps()} className="table table-striped ">
          <thead className="thead-dark">{renderTableHeaders()}</thead>
          <tbody {...getTableBodyProps()}>{renderTableRows()}</tbody>
        </table>
      </div>
      <Pagination {...tableInstance} />
      {showDeleteModal && (
        <DeleteProductModal
          isOpen={showDeleteModal}
          onClose={setShowDeleteModal}
          product={deleteProduct}
          getAllProducts={getAllProducts}
        />
      )}
      {showCreateModal && (
        <CreateProductModal
          isOpen={showCreateModal}
          onClose={setShowCreateModal}
          getAllProducts={getAllProducts}
        />
      )}
      {showUpdateModal && (
        <UpdateProductModal
          isOpen={showUpdateModal}
          onClose={setShowUpdateModal}
          product={updateProduct}
          getAllProducts={getAllProducts}
        />
      )}
    </React.Fragment>
  );
};

ProductsTable.propTypes = {
  value: PropTypes.any,
};
export default ProductsTable;
