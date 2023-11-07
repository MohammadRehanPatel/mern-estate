import React, { useState, useEffect } from "react";
import { FaHome, FaInfo, FaSearch, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-blue-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-900">It's </span>
            <span className="text-blue-700"> Home</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" bg-slate-100 rounded-lg p-3 flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <div className="">
              <button
                className={`
        px-4 py-2 
        flex items-center gap-2 
        text-blue-700
        
        rounded-full
        transition-all

        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-blue-500
    `}
              >
                <FaHome />
                <span>Home</span>
              </button>
            </div>
          </Link>
          <Link to="/about">
            <div className="">
              <button
                className={`
                px-4 py-2 
                flex items-center gap-2 
                text-blue-700
                
                rounded-full
                transition-all
        
                hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                hover:text-blue-500
    `}
              >
                <FaInfo />
                <span>About</span>
              </button>
            </div>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <div className="">
                <button
                  className={`
                  px-2 py-2 
                  flex items-center gap-2 
                  text-blue-700
                  
                  rounded-full
                  transition-all
          
                  hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                  hover:text-blue-500
    `}
                >
                  <FaSignInAlt />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
