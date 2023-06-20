import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container flex-grow-1 
      ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
