import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchFilter from "../SearchFilter/SearchFilter";
import logo from "../../asset/image/logo1.png";
import logo2 from "../../asset/image/logo3.png";
import SignUp from "../SignUp/SignUp";
import Quiz from "../Quiz/Quiz";
import "./Main.css";
import { links } from "../../utils/data";
export default function Main() {
  const [linkActive, setLinkActive] = useState(0);
  const logoRef = useRef();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (screenWidth <= 480) {
      logoRef.current.src = logo2;
    } else if (screenWidth > 480) {
      logoRef.current.src = logo;
    }
  }, [screenWidth]);

  return (
    <main className="Main">
      <nav className="header">
        <div className="logo">
          <img src={logo} ref={logoRef} alt="" />
        </div>
        <div className="links">
          {links.map((link, index) => (
            <li
              className={`link ${linkActive === index ? "active" : ""} `}
              key={link.id}
              onClick={() => setLinkActive(index)}
            >
              <Link to={link.to}>
                <i className={link.icon}></i> <p>{link.name}</p>
              </Link>
            </li>
          ))}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<SearchFilter />}></Route>
        <Route path="/Week6" element={<SearchFilter />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Routes>
    </main>
  );
}
