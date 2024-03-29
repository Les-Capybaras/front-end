import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-papotcar.png";
import { useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import Profile from "../profil/Profil";

export default function Header() {

  const handleResponsive = () => {
    console.log("123");
  };

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/")[1];

  return (
    <div className="navbar bg-base-100">
      <div className="header-logo">
        <img src={logo} alt="papotcar" />
      </div>
      <div className="header-link">
        <ul className="menu menu-horizontal px-1">
          <li className={splitLocation === "dashboard" ? "active" : ""}>
            <Link to="/dashboard">Accueil</Link>
          </li>
          <li className={splitLocation === "road" ? "active" : ""}>
            <Link to="/road">Mes Trajets</Link>
          </li>
          <li className={splitLocation === "demands" ? "active" : ""}>
            <Link to="/demands">Mes Demandes</Link>
          </li>
        </ul>
      </div>
      <div className="header-options">
          <Link className="btn btn-ghost btn-new-trajectory" to="/creation">
            <HiPlus />
            Nouveau trajet
          </Link>
          <a className="responsive-header btn btn-ghost normal-case text-xl">
            <IoMenu onClick={handleResponsive} />
          </a>
          <Profile />
      </div>
      
      

      
    </div>
  );
}
