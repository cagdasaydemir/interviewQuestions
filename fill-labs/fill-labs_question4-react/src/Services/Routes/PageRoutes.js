import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Layout from "../../Containers/Layout";
import Master from "../../Pages/Master";
import Detail from "../../Pages/Detail";
import PageNotFound from "../../Pages/PageNotFound";

const PageRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Master />} />
          <Route exact path="/detail" element={<Detail />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default PageRoutes;
