import React, { useContext, useState, useRef } from "react";
import AppContext from "../../context";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { IoChevronDownOutline } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function Profile() {
  const { currentUser } = useContext(AppContext);
  const form = useRef();
  const checkBtn = useRef();

  const navigate = useNavigate();

  const handleDisconnect = () => {
    AuthService.logout();
    navigate("/auth");
    window.location.reload();
  };

  const [profilSwitch, setProfilSwitch] = React.useState(true);
  const [firstname, setFirstname] = useState("");
  const [id, setId] = useState(currentUser.user.id);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setFirstname(name);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    console.log("147");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.edit(id, firstname).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div tabIndex="0" className="header-profil dropdown dropdown-bottom dropdown-end">
          <a className="profil normal-case text-xl">
            <IoPersonCircleSharp />
            <div>
              <p>{currentUser.user.firstname}</p>
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
          <div className="title-modal-dc">
            <label
              htmlFor="dc-modal"
              className="btn btn-circle btn-outline btn-sm"
            >
              <IoClose />
            </label>
            <h3 className="text-lg font-bold">
              Êtes vous sûr de vouloir vous déconnecter ?
            </h3>
          </div>

          <button
            onClick={() => handleDisconnect()}
            className="flex mt-5 btn btn-ghost dc-btn"
          >
            Deconnexion
          </button>
        </label>
      </label>

      {/* SETTINGS PROFILE MODAL */}
      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="setting-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Mon profil</h3>
          <div className="py-4 flex">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="form-control ml-3 text-2xl font-bold">
              {profilSwitch ? (
                <>
                  <label className="firstname">
                    <span className="label-text">Prénom</span>
                  </label>
                  <label className="lastname">
                    <span className="label-text">{currentUser.user.firstname}</span>
                  </label>
                  <label className="email">
                    <span className="label-text">{currentUser.user.email}</span>
                  </label>
                </>
              ) : (
                <>
                <Form onSubmit={handleEdit} ref={form}>
                  {/* <input type="text" placeholder="Prénom" className="input input-bordered input-xs w-full max-w-xs mt-2" /> */}
                  <input type="text" placeholder={currentUser.user.firstname}  onChange={onChangeName} className="input input-bordered input-xs w-full max-w-xs mt-2" />
                  <label className="email">
                    <span className="label-text">{currentUser.user.email}</span>
                  </label>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                </>
              )}
            </div>
          </div>
          {profilSwitch ? (
            <button
              onClick={() => setProfilSwitch(!profilSwitch)}
              className="flex mt-3 btn btn-primary"
            >
              Modifier
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={() => setProfilSwitch(!profilSwitch)}
                className="flex mt-3 btn "
              >
                Annuler
              </button>

              <button
                onClick={() => setProfilSwitch(!profilSwitch)}
                className="flex mt-3 ml-3 btn btn-outline btn-primary"
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
