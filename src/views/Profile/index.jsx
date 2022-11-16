import axios from "axios";
import jwt_decode from "jwt-decode";
import Layout from "../../layouts/Layout";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import "./index.css";

const Profile = () => {
  const [emp, setemp] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [data, setData] = useState({
    firstname: "",
    username: "",
    lastname: "",
    password: "",
    adress: "",
    telephone: "",
    departement: 0,
    role: 2,
  });

  const handleChange = (value) => {
    setData({ ...data, [value.id]: value.value });
  };
  const userToken = localStorage.getItem("token");
  var decoded = jwt_decode(userToken);
  console.log("profile", decoded);
  return (
    <Layout>
      <div className="bg-light me-5 rounded p-5">
        <div class="container-fluid ">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="text-uppercase">Profile</h3>
            <button
              type="button"
              className="btn btn-primary p-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ajouter employé
              <BsPlus size={28} />
            </button>
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    class="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 class="my-3">{decoded.firstname}</h5>
                  <p class="text-muted mb-0">Full Stack Developer</p>
                  <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        {decoded.firstname} {decoded.lastname}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{decoded.username}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{decoded.telephone}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{decoded.adress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
