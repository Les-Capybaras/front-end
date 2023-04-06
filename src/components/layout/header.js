import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo-papotcar.png";
import { useLocation } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoPlus } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import AuthService from '../../services/auth.service';
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const handleResponsive = () => {
    console.log("123");
  };

  const handleDisconnect = () => {
    AuthService.logout();
    navigate("/auth");
    window.location.reload();
  }

  const [profilSwitch, setProfilSwitch] = React.useState(true);

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
          <li className={splitLocation === "" ? "active" : ""}>
            <Link to="/">Accueil</Link>
          </li>
          <li className={splitLocation === "road" ? "active" : ""}>
            <Link to="/road">Mes Trajets</Link>
          </li>
        </ul>
      </div>
      <div>
        <button className="btn btn-ghost btn-new-trajectory">
          <HiPlus />
          Nouveau trajet
        </button>
      </div>
      <div tabIndex="0" className="header-profil dropdown dropdown-bottom dropdown-end">
          <a className="profil normal-case text-xl">
            <IoPersonCircleSharp />
            <div>
              <p>Nom Prénom</p>
            </div>
          </a>
          <a className="settings normal-case text-xl">
            <IoChevronDownOutline />
          </a>
        
        <ul tabIndex="0" className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          <li><label htmlFor="setting-modal"><IoSettingsSharp /> Paramètres </label></li> 
          <li><label htmlFor="dc-modal"><BiLogOutCircle />Deconnexion</label></li>
        </ul>
      </div>

      {/* DISCONNECT MODAL */}
      <input type="checkbox" id="dc-modal" className="modal-toggle" />
      <label htmlFor="dc-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
        <label htmlFor="dc-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Êtes vous sûr de vouloir vous déconnectez ?</h3>
          <button onClick={() => handleDisconnect()} className="flex mt-5 btn btn-error">Deconnexion</button>
        </label>
      </label>


      {/* SETTINGS PROFILE MODAL */}
      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="setting-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">Mon profil</h3>
          <div className="py-4 flex">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="form-control ml-3 text-2xl font-bold">
              {profilSwitch 
              ? (
                <>
                  <label className="firstname">
                    <span className="label-text">Prénom</span>
                  </label>
                  <label className="lastname">
                    <span className="label-text">Nom</span>
                  </label>
                  <label className="email">
                    <span className="label-text">user@mail.com</span>
                  </label>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Prénom" className="input input-bordered input-xs w-full max-w-xs mt-2" />
                  <input type="text" placeholder="Nom" className="input input-bordered input-xs w-full max-w-xs mt-2" />
                  <input type="text" placeholder="user@mail.com" className="input input-bordered input-xs w-full max-w-xs mt-2" />
                </>
              )}
              
            </div>
          </div>
          {profilSwitch 
            ? (
              <button onClick={() => setProfilSwitch(!profilSwitch)} className="flex mt-3 btn btn-primary">Modifier</button>
            ) : (
            <div className="flex">
              <button onClick={() => setProfilSwitch(!profilSwitch)} className="flex mt-3 btn ">Annuler</button>

              <button onClick={() => setProfilSwitch(!profilSwitch)} className="flex mt-3 ml-3 btn btn-outline btn-primary">Enregistrer</button>
            </div>
          )}
          
        </div>
      </div>

      <a className="responsive-header btn btn-ghost normal-case text-xl">
        <IoMenu onClick={handleResponsive} />
      </a>
    </div>
  );
}
