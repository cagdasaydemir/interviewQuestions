import React from "react";

import { useNavigate } from "react-router-dom";

const Detail = ({action}) => {
  const navigate = useNavigate();

  return (
    <div className="row container-fluid">
      <h4 className="mb-3">USER #ID</h4>
      <div className="needs-validation" novalidate="">
        <div className="row mb-3">
          <div className="col-md-4 mb-3">
            <label for="username">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                required=""
              />
              <div className="invalid-feedback">Your username is required.</div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label for="password">Password</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Password"
                required=""
              />
              <div className="invalid-feedback">Your password is required.</div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label for="email">
              Email <span className="text-muted"></span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder=""
              value=""
              required=""
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder=""
              value=""
              required=""
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>
        </div>

        <hr className="mb-4" />
        <div className="d-flex justify-content-center ">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary btn-lg btn-block mx-2"
          >
            Go Back
          </button>
          <button className="btn btn-primary btn-lg btn-block mx-2">
          {action === 'Delete' ? 'UPDATE' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
