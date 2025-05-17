import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import { RiSearchLine } from "react-icons/ri";
import { api_base_url } from '../Helper';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const getUser = () => {
    fetch(api_base_url + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message)
      }
      else {
        setData(data.user)
      }
    })
  };

  const logout = () => {
    fetch(api_base_url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message)
      }
      else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    })
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">
        <img src={logo} alt="Logo" />

        <div className="right flex items-center justify-end gap-2">
          <div className="inputBox w-[30vw] flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm">
            <RiSearchLine />
            <input className="outline-none w-full" type="text" placeholder='Search Here... !' />
          </div>

          <button
            onClick={logout}
            className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600'
          >
            Logout
          </button>

          {/* Custom Avatar Circle */}
          <div className="w-[40px] h-[40px] rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold cursor-pointer">
            {data?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
