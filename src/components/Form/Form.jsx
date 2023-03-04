import "./Form.css"
import React, { useLayoutEffect, useState } from "react"
import Register from "./Register"
import Login from "./Login"
export default function Form() {
  const [listAccout, setListAccout] = useState(
    localStorage.getItem("Accout")
      ? JSON.parse(localStorage.getItem("Accout"))
      : []
  )

  const [click, setClick] = useState(false)
  const toggle = () => {
    const inputValue = document.querySelectorAll(".Form input")
    inputValue.forEach((item) => {
      item.value = ""
    })
    setClick(!click)
  }

  useLayoutEffect(() => {
    localStorage.setItem("Accout", JSON.stringify(listAccout))
  }, [listAccout])

  return (
    <div className="Form">
      <div
        className={`container ${click ? "right-panel-active" : ""}`}
        id="container"
      >
        <Register
          toggle={toggle}
          setListAccout={setListAccout}
          listAccout={listAccout}
        ></Register>
        <Login toggle={toggle}></Login>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">
                Hello <br /> friends
              </h1>
              <p>if you have account, login here and have fun </p>
              <button className="ghost" id="login" onClick={toggle}>
                Login
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1 className="title">
                Start your <br /> journey now
              </h1>
              <p>
                if you don't have an account yet, join us and start your journey
              </p>
              <button className="ghost" id="register" onClick={toggle}>
                register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
