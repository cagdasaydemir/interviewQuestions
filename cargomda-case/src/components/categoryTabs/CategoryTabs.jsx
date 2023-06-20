import { useEffect, useState } from "react";
import api from "../../api/api";

import DeleteCategoryModal from "../modals/categories/deleteCategoryModal/DeleteCategoryModal";
import CreateCategoryModal from "../modals/categories/createCategoryModal/CreateCategoryModal";
import UpdateCategoryModal from "../modals/categories/updateCategoryModal/UpdateCategoryModal";

const CategoryTabs = () => {
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [updateCategory, setUpdateCategory] = useState();
  const [deleteCategory, setDeleteCategory] = useState();

  const retrieveCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };

  const getAllCategories = async () => {
    const allCategories = await retrieveCategories();
    if (allCategories) setCategories(allCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="d-flex align-items-start">
        <div
          className="nav flex-column nav-pills me-3 bg-light py-2 px-2 rounded border"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            type="button"
            className="btn btn-success mb-3 p-3"
            onClick={() => setShowCreateCategory(true)}
          >
            Add Category
          </button>
          {categories.map((category, i) => (
            <button
              key={i}
              className={`nav-link ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="tab-content w-100" id="v-pills-tabContent">
          {categories.map((category, i) => (
            <div
              key={i}
              className={`tab-pane fade ${
                activeTab === i ? "show active" : ""
              }`}
              id={`v-pills-${category.id}`}
              role="tabpanel"
            >
              <div className="d-flex justify-content-between bg-light rounded border py-2 px-2">
                <h2 className="ms-2 ">{category.name}</h2>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      setShowUpdateCategory(true);
                      setUpdateCategory(category);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowDeleteCategory(true);
                      setDeleteCategory(category);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                className="d-flex flex-column  bg-light rounded border py-3 px-3 mt-3"
                style={{ maxHeight: "700px", overflow: "auto" }}
              >
                <h4 className="align-self-start">Subcategories</h4>
                <div className="d-flex flex-wrap justify-content-center">
                  {(category.subcategories && category.subcategories?.length > 0) ? (
                    category.subcategories?.map((subcategory, j) => (
                      <span
                        key={j}
                        className="badge bg-primary text-light p-2 m-1"
                        style={{ widht: "100px" }}
                      >
                        {subcategory}
                      </span>
                    ))
                  ) : (
                    <h5 className="text-center">
                      There isn&apos;t any subcategories created yet!<br></br>{" "}
                      <strong>Please press edit and add subcategories.</strong>
                    </h5>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDeleteCategory && (
        <DeleteCategoryModal
          isOpen={showDeleteCategory}
          onClose={setShowDeleteCategory}
          category={deleteCategory}
          getAllCategories={getAllCategories}
        />
      )}
      {showCreateCategory && (
        <CreateCategoryModal
          isOpen={showCreateCategory}
          onClose={setShowCreateCategory}
          getAllCategories={getAllCategories}
        />
      )}
      {showUpdateCategory && (
        <UpdateCategoryModal
          isOpen={showUpdateCategory}
          onClose={setShowUpdateCategory}
          getAllCategories={getAllCategories}
          category={updateCategory}
        />
      )}
    </>
  );
};

export default CategoryTabs;
