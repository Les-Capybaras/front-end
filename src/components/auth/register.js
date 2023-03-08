/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Register() {
    return (
        <div class="loginScreen h-screen flex flex-col justify-center">
      <form class="loginContainer card w-96 bg-base-100 shadow-xl card-bordered">
        <div class="card-body">
          <div class="flex flex-row">
            <h2 class="loginTitle card-title ">Papotcar</h2>
          </div>
          <div class="text-success"></div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              required
              class="input input-bordered"
              v-model="email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="password"
              required
              class="input input-bordered"
              v-model="password"
            />
          </div>
          <div class="text-error"></div>
          <div class="form-control mt-6">
            <button class="btn btnLogin">Se connecter</button>
          </div>
          <label class="justify-center label">
            <a class="forgotLabel link-hover">Mot de passe oublié?</a>
          </label>
          <div class=" flex justify-center align-center">
            <p class="newAccount">Vous n'avez pas encore de compte ?</p>
              
          </div>
        </div>
      </form>
      </div>
    )
}