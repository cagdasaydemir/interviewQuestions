import PropTypes from "prop-types";
import { BsFillAirplaneFill } from "react-icons/bs";

const CompanyLogo = ({ iconSize }) => {
  return <BsFillAirplaneFill size={iconSize ? iconSize : 30} />;
};

CompanyLogo.propTypes = {
  iconSize: PropTypes.number,
};

export default CompanyLogo;
