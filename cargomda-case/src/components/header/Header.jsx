import { Link, useLocation } from "react-router-dom";
import CompanyLogo from "../companyLogo/CompanyLogo";

const Header = () => {
  const location = useLocation();

  const isActiveLink = (pathname) => location.pathname === pathname;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "Categories" },
    { path: "/products", label: "Products" },
  ];
  return (
    <nav
      className="navbar navbar-expand-lg mb-4"
      style={{ backgroundColor: "var(--company-color)" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <CompanyLogo />
          <span className="ms-3">Company Name</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="navbar-nav">
              {navLinks.map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <Link
                    className={`nav-link ${isActiveLink(path) ? "active" : ""}`}
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
