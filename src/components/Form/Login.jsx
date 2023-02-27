import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login(props) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const { toggle } = props;
  return (
    <div className="form-container login-container">
      <form action="#">
        <h1>Login</h1>
        <div className="textfield">
          <input
            type="text"
            required
            {...register("Username", {
              pattern: {
                value: /^[^0-9]\D*\d+\D*$/,
                message: "Invalid Username",
              },
            })}
          />
          <span></span>
          <label htmlFor="">Username</label>

          {errors.Username && (
            <p className="error">{errors.Username.message}</p>
          )}
        </div>
        <div className="textfield">
          <input
            type="password"
            required
            {...register("Passwork", {
              pattern: {
                value: /^.{8,}$/,
                message: "Password must have 8 characters",
              },
            })}
          />
          <span></span>
          <label htmlFor="">Passwork</label>

          {errors.Passwork && (
            <p className="error">{errors.Passwork.message}</p>
          )}
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <p htmlFor="">Remember me</p>
          </div>
          <div className="pass-link">
            <Link to="#">Forgot password?</Link>
          </div>
        </div>
        <button>Login</button>
        <span>or use your account</span>
        <div className="social-container">
          <Link to="#" className="social">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link to="#" className="social">
            <i className="fa-brands fa-google"></i>
          </Link>
        </div>
        <div className="btn-mobile">
          <button type="button" onClick={toggle}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
