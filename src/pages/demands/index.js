import { IoPersonCircleSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export default function Demands() {
  return (
    <div className="">
      <div className="blue-container">
        <div className="destination"></div>
        <div className="mt-5 flex flex-col justify-center items-center gap-7">
          <h1 className="title">
            Trouvez le trajet idéal avec nos passagers de confiance
          </h1>
        </div>
      </div>
      <div class="flex flex-col items-center -mt-16">
        <div className="card lg:w-2/5 w-full bg-base-100 shadow-xl">
          <div class="card-body">
            <h1 className="card-title">Demandes pour vos trajet</h1>
            <table class="table w-full">
              <tbody>
                {/* <!-- row 1 --> */}
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Ismael Miguelez</td>
                  <td>Nantes - Paris</td>
                  <td class="justify-end flex gap-2">
                    <button class="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button class="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
                {/* row 2 */}
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Benjamin Bordelet</td>
                  <td>Nantes - Paris</td>
                  <td class="justify-end flex gap-2">
                    <button class="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button class="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
                {/* <!-- row 3 --> */}
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Antoine Marionneau</td>
                  <td>Nantes - Paris</td>
                  <td class="justify-end flex gap-2">
                    <button class="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button class="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
