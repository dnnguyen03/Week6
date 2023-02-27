import React from "react";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Username: "",
      Email: "",
      Passwork: "",
    },
  });
  const { setListAccout, toggle } = props;
  const onSubmit = (data) => {
    setListAccout((prev) => [...prev, data]);
  };
  const resetValue = () => {
    // toggle();
    setValue("Username", "");
  };
  return (
    <div className="form-container register-container">
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
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
            type="text"
            required
            {...register("Email", {
              pattern: {
                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: "Invalid email address",
              },
            })}
          />
          <span></span>
          <label htmlFor="">Email</label>

          {errors.Email && <p className="error">{errors.Email.message}</p>}
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
        <div className="btn-mobile">
          <button type="button" onClick={resetValue}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
