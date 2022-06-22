import React, { useEffect, useState } from "react";

import { 
  Link,
} from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import "./Header.scss";
const Header = ({}) => {
  const [action, setAction] = useState("");
useEffect(() =>{
  
  document.getElementById("create-btn").addEventListener("click", () => { setAction("Create"); });
  document.getElementById("edit-btn").addEventListener("click", () => { setAction("Save"); });
  document.getElementById("delete-btn").addEventListener("click", () => { setAction("Delete"); });
  
})

  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link
        to={"/"}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <IconContext.Provider className="" value={{ size: "40px" }}>
          <AiOutlineUser className="ai-outline-user" />
        </IconContext.Provider>
        <span className="fs-3 mx-3">User Management System</span>
      </Link>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to={"./detail"} id="create-btn" className="nav-link active " aria-current="page">
            New
          </Link>
          
        </li>
        <li className="nav-item ">
          
          <Link to={"./detail"} id="edit-btn" className="nav-link active bg-success">
            Edit
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"./detail"} id="delete-btn"className="nav-link active bg-danger">
            Delete
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
