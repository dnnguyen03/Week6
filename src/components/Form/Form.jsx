import "./Form.css";
import React, { useState } from "react";
export default function Form() {
  const [click, setClick] = useState(false);
  const toggle = () => {
    setClick(!click);
  };
  return (
    <div className="Form">
      <div
        className={`container ${click ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container register-container">
          <form action="#">
            <h1>Register</h1>
            <div className="textfield">
              <input type="text" required />
              <span></span>
              <label htmlFor="">Username</label>
              <p className="error"></p>
            </div>
            <div className="textfield">
              <input type="text" required />
              <span></span>
              <label htmlFor="">Email</label>
              <p className="error"></p>
            </div>
            <div className="textfield">
              <input type="password" required />
              <span></span>
              <label htmlFor="">Passwork</label>
              <p className="error"></p>
            </div>
            <button>Register</button>
            <span>or use your account</span>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </form>
        </div>

        <div className="form-container login-container">
          <form action="#">
            <h1>Login</h1>
            <div className="textfield">
              <input type="text" required />
              <span></span>
              <label htmlFor="">Username</label>
              <p className="error"></p>
            </div>
            <div className="textfield">
              <input type="password" required />
              <span></span>
              <label htmlFor="">Passwork</label>
              <p className="error"></p>
            </div>
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <p htmlFor="">Remember me-</p>
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <button>Login</button>
            <span>or use your account</span>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </form>
        </div>

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
  );
}
