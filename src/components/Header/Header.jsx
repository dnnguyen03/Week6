import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchFilter from "../SearchFilter/SearchFilter";
import logo from "../../asset/image/logo1.png";
import SignUp from "../SignUp/SignUp";
import Quiz from "../Quiz/Quiz";
import "./Header.css";
import { links } from "../../utils/data";
export default function Header() {
  const [linkActive, setLinkActive] = useState(0);
  return (
    <header className="Header">
      <nav>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="links">
          {links.map((link, index) => (
            <li
              className={`link ${linkActive === index ? "active" : ""} `}
              key={link.id}
              onClick={() => setLinkActive(index)}
            >
              <Link to={link.to}>{link.name}</Link>
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
    </header>
  );
}
