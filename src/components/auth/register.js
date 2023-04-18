import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import DatePicker from "react-datepicker";

import AuthService from "../../services/auth.service";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vfirstname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The firstname must be between 3 and 20 characters.
      </div>
    );
  }
};
const vlastname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        The lastname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vpasswordConfirmation = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [birthdate, setBirthdate] = useState();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstname(firstname);
  };
  const onChangeLastname = (e) => {
    const lastname = e.target.value;
    setLastname(lastname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangePasswordConfirmation = (e) => {
    const passwordConfirmation = e.target.value;
    setPasswordConfirmation(passwordConfirmation);
  };
  
  // const onChangeBirthdate = (e) => {
  //   const birthdate = e.target.value;
  //   setBirthdate(birthdate);
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstname, lastname, email, password, passwordConfirmation).then(
        (response) => {
          setMessage("Utilisateur créer avec succès!");
          props.handleLoginSwitch();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="container mx-auto loginScreen h-screen flex flex-col justify-center">
      <Form onSubmit={handleRegister} ref={form} className="loginContainer register card w-96 bg-base-100 shadow-xl card-bordered">
        <div className="card-body">
        {!successful && (
          <div>
          <div className="flex flex-row justify-center">
            <img src="../logoPPC.png" className="logoImgAuth" />
          </div>
          <div className="text-success"></div>
          
          <div className="doubleInputForm mt-5 mb-2">
            <div className="form-control w-50">
              <input
                type="text"
                placeholder="Nom"
                required
                className="input input-bordered"
                v-model="firstname"
                name="firstname"
                value={firstname}
                onChange={onChangeFirstname}
                validations={[vfirstname]}
              />
            </div>
            <div className="form-control w-50">
              <input
                type="text"
                placeholder="Nom"
                required
                className="input input-bordered"
                v-model="lastname"
                name="lastname"
                value={lastname}
                onChange={onChangeLastname}
                validations={[vlastname]}
              />
            </div>
          </div>
          {/* <div className="form-control">
            <input
              type="text"
              id="date-input"
              className="input input-bordered my-2"
              value={birthdate}
              onChange={onChangeBirthdate}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="dd/mm/yyyy"
              required
            />
          </div> */}

          <div className="form-control">
            <input
              type="email"
              placeholder="Adresse email"
              required
              className="input input-bordered my-2"
              v-model="email"
              value={email}
                onChange={onChangeEmail}
                validations={[validEmail]}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Mot de passe"
              required
              className="input input-bordered my-2"
              v-model="password"
              value={password}
                onChange={onChangePassword}
                validations={[vpassword]}
              />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              required
              className="input input-bordered my-2"
              v-model="password"
              value={passwordConfirmation}
                onChange={onChangePasswordConfirmation}
                validations={[vpasswordConfirmation]}
              />
          </div>

          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">S'inscrire</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div className="divider"></div> 
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous avez déjà un compte ?</p>
            <a
              className="linkCreate link-hover pl-2"
              onClick={props.handleLoginSwitch}
            >
              Se connecter
            </a>
          </div>
          </div>
          )}
        </div>
        <figure className="registerImg">
          <img src="../login-img.png" className="pic" />
        </figure>
        {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}