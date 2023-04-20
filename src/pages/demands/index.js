import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

export default function Demands() {
  const [demands, setDemands] = useState([]);
  const [usernames, setUsernames] = useState(null);

  useEffect(() => {
    fetch(`http://back.papotcar.ismadev.fr/api/request`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setDemands(response);
      });
      getUsernames();
  }, []);

  const handleAccept = (id) => {
    console.log(id);
    fetch(`http://back.papotcar.ismadev.fr/api/request/${id}/accept`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
      .then((response) => {
        return response.json();
      }
      )
      .then((response) => {
        const filteredDemands = demands.filter((demand) => demand.id !== id);
        setDemands(filteredDemands);
      }
      );
  };

  const handleReject = (id) => {
    console.log(id);
    fetch(`http://back.papotcar.ismadev.fr/api/request/${id}/reject`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    })
      .then((response) => {
        return response.json();
      }
      )
      .then((response) => {
        const filteredDemands = demands.filter((demand) => demand.id !== id);
        setDemands(filteredDemands);
      }
      );
  };

  const getUsernames = async () => {
    try {
          const response = await fetch(`http://back.papotcar.ismadev.fr/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    const data = await response.json();
    setUsernames(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsername = (id) => {
    if (usernames) {
      const user = usernames.find((user) => user.id === id);
      return `${user.firstname} ${user.lastname}`;
    }
    else {
      return 'Utilisateur Inconnu';
    }
  };

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
      <div className="flex flex-col items-center -mt-16">
        <div className="card lg:w-2/5 w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Demandes pour vos trajet</h1>
            <table className="table w-full">
              <tbody>
                {/* <!-- Dynamic --> */}
                {demands && demands.map((demand) => {
                  return (
                    <tr className="passager-info" key={demand.id}>
                      <th className="passager-avatar">
                        <IoPersonCircleSharp />
                      </th>
                      <td>{getUsername(demand.userId)}</td>
                      <td>{demand.trip.price}</td>
                      <td className="justify-end flex gap-2">
                        <button onClick={() => handleAccept(demand.id)} className="btn  btn-ghost btn-circle btn-outline btn-success">
                          <BsCheckLg />
                        </button>
                        <button onClick={() => handleReject(demand.id)} className="btn  btn-ghost btn-circle btn-outline btn-error">
                          <RxCross2 />
                        </button>
                      </td>
                    </tr>
                  );
                }
                )}
                {/* 
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Ismael Miguelez</td>
                  <td>Nantes - Paris</td>
                  <td className="justify-end flex gap-2">
                    <button className="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button className="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Benjamin Bordelet</td>
                  <td>Nantes - Paris</td>
                  <td className="justify-end flex gap-2">
                    <button className="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button className="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
                <tr className="passager-info">
                  <th className="passager-avatar">
                    <IoPersonCircleSharp />
                  </th>
                  <td>Antoine Marionneau</td>
                  <td>Nantes - Paris</td>
                  <td className="justify-end flex gap-2">
                    <button className="btn  btn-ghost btn-circle btn-outline btn-success">
                      <BsCheckLg />
                    </button>
                    <button className="btn  btn-ghost btn-circle btn-outline btn-error">
                      <RxCross2 />
                    </button>
                  </td>
                </tr> */}

                {demands.length === 0 && (
                  <tr>
                    <td className="text-center title" colSpan="4">
                      Aucune demande pour le moment
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
