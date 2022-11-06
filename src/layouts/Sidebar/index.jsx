import { useNavigate, useLocation } from "react-router-dom";
import { SlPeople, SlBriefcase } from "react-icons/sl";
import {
  BsCalendarMinus,
  BsPersonCircle,
  BsFileEarmarkPerson,
} from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { AiOutlineFileDone, AiOutlinePieChart } from "react-icons/ai";
import { VscRemoteExplorer } from "react-icons/vsc";
import { IconContext } from "react-icons";
const Sidebar = () => {
  const { pathname } = useLocation();
  const history = useNavigate();

  const navigate = (path) => {
    history(path);
  };

  return (
    <IconContext.Provider value={{ color: "FB2576" }}>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs bg-dark border-0 fixed-start"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <a
            className="navbar-brand m-0"
            href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html"
          >
            <img
              class="company-logo"
              width={30}
              alt="company logo"
              _v-ab01d028=""
              src="https://img.jobi.tn/0796ce39-f07d-bf64-07c0-d2eb7c00ca22/version/crop/50x50/0-0/"
            />
            <span className="h5 ms-2 text-uppercase text-white font-weight-bold">
              Insodev RH
            </span>
          </a>
        </div>
        <hr className="horizontal light mt-0" />
        <div
          className="collapse navbar-collapse w-auto max-height-vh-100 h-100"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={`nav-link  ${
                  pathname === "/dashboard" ? "active" : "text-white"
                }`}
                onClicnk={() => navigate("/dashboard")}
              >
                <div className="me-2 d-flex align-items-center justify-content-center">
                  <AiOutlinePieChart size={30} />
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
            <li className={`nav-item`}>
              <a
                className={`nav-link  ${
                  pathname === "/employers" ? "active" : "text-white"
                }`}
                onClick={() => navigate("/employers")}
              >
                <div className="me-2 d-flex align-items-center justify-content-center">
                  <BsFileEarmarkPerson size={30} />
                </div>
                <span className="nav-link-text ms-1">Profile</span>
              </a>
            </li>
            <li className={`nav-item`}>
              <a
                className={`nav-link  ${
                  pathname === "/wliddays" ? "active" : "text-white"
                }`}
                onClick={() => navigate("/wliddays")}
              >
                <div className="me-2 d-flex align-items-center justify-content-center">
                  <BsCalendarMinus size={30} />
                </div>
                <span className="nav-link-text ms-1">Demande de congé</span>
              </a>
            </li>
            <li className={`nav-item`}>
              <a
                className={`nav-link  ${
                  pathname === "/permissions" ? "active" : "text-white"
                }`}
                onClick={() => navigate("/permissions")}
              >
                <div className="me-2 d-flex align-items-center justify-content-center">
                  <BiTask size={30} />
                </div>
                <span className="nav-link-text ms-1">
                  Demande de autorisation
                </span>
              </a>
            </li>
            <li className={`nav-item`}>
              <a
                className={`nav-link  ${
                  pathname === "/remote" ? "active" : "text-white"
                }`}
                onClick={() => navigate("/remote")}
              >
                <div className="me-2 d-flex align-items-center justify-content-center">
                  <VscRemoteExplorer size={30} />
                </div>
                <span className="nav-link-text ms-1">
                  {" "}
                  Demande de Télé travail
                </span>
              </a>
            </li>

            {/* <li className={`nav-item`}>
              <a
                className={`nav-link  ${
                  pathname === "/remote" ? "active" : ""
                }`}
                onClick={() => navigate("/remote")}
              >
                <div className=""></div>
                <span className="nav-link-text ms-1">
                  Demande de Télé travail
                </span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>
    </IconContext.Provider>
  );
};
export default Sidebar;
