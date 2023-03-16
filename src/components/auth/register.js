/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Register({ handleLoginSwitch }) {
  return (
    <div className="loginScreen h-screen flex flex-col justify-center">
      <form className="loginContainer register card card-side bg-base-100 shadow-xl card-bordered">
        <div className="card-body">
          <div className="flex flex-row justify-center">
            <img src="../logoPPC.png" className="logoImgAuth" />
          </div>
          <div className="text-success"></div>
          <div className="doubleInputForm">
            <div className="form-control">
              <input
                type="email"
                placeholder="Adresse email"
                required
                className="inputRegister input input-bordered"
                v-model="email"
              />
            </div>
            <div className="form-control">
              <input
                type="phone"
                placeholder="Téléphone"
                required
                className="inputRegister input input-bordered"
                v-model="phone"
              />
            </div>
          </div>
          <div className="doubleInputForm">
            <div className="form-control">
              <input
                type="name"
                placeholder="Nom"
                required
                className="inputRegister input input-bordered"
                v-model="name"
              />
            </div>
            <div className="form-control">
              <input
                type="surname"
                placeholder="Prénom"
                required
                className="inputRegister input input-bordered"
                v-model="surname"
              />
            </div>
          </div>
          <div className="form-control">
              <input
                type="password"
                placeholder="Mot de passe"
                required
                className="input input-bordered"
                v-model="password"
              />
            </div>

          <div className="text-error"></div>
          <div className="form-control mt-6">
            <button className="btn btnLogin">S'inscrire</button>
          </div>
          <label className="justify-center label">
            <a className="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div class="divider"></div> 
          <div className=" flex justify-center align-center">
            <p className="newAccount">Vous avez déjà un compte ?</p>
            <a
              className="linkCreate link-hover pl-2"
              onClick={handleLoginSwitch}
            >
              Se connecter
            </a>
          </div>
        </div>
        <figure className="registerImg">
          <img src="../login-img.png" className="pic" />
        </figure>
      </form>
    </div>
  );
}
