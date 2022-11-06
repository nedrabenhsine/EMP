import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  var decoded = jwt_decode(userToken);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <nav
        className="navbar d-flex justify-content-end navbar-main navbar-expand-lg shadow-none border-radius-xl"
        navbar-scroll="true"
      >
        <div class="dropdown me-5 pe-5">
          <button
            class="btn btn-dark dropdown-toggle p-3"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <BsPersonCircle className="me-2" size={30} />
            {decoded.username}
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" onClick={logout} href="#">
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
