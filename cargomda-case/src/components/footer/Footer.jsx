import {
  BsTwitter,
  BsInstagram,
  BsFacebook,
} from "react-icons/bs";
import CompanyLogo from "../companyLogo/CompanyLogo";

const Footer = () => {
  const iconSize = 24;
  const socialLinks = [
    { path: "https://twitter.com/", logo: <BsTwitter size={iconSize} /> },
    { path: "https://instagram.com/", logo: <BsInstagram size={iconSize} /> },
    { path: "https://facebook.com/", logo: <BsFacebook size={iconSize} /> },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="border-top py-3 my-4 align-items-center">
      <footer className="d-flex flex-wrap justify-content-between container">
        <div className="d-flex align-items-center">
          <a href="/" className="me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <CompanyLogo iconSize={iconSize} />
          </a>
          <span className="mb-md-0 text-body-secondary">
            © {currentYear} Company, Inc
          </span>
        </div>
        <ul className="nav justify-content-end align-items-center list-unstyled d-flex">
          {socialLinks.map(({ path, logo }) => (
            <li key={path} className="ms-3">
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-secondary"
              >
                {logo}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
};

export default Footer;