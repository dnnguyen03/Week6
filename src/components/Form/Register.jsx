import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Register(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" })
  const { setListAccout, toggle, listAccout } = props
  const onSubmit = (data) => {
    console.log(data, listAccout)
    setListAccout((prev) => [...prev, data])
  }
  // const [emailExists, setEmailExists] = useState(false)
  // const handleEmailBlur = () => {
  //   const email = watch("Email")

  //   listAccout.forEach((accout) => {
  //     if (accout.Email === email) {
  //       return setEmailExists(true)
  //     }
  //     setEmailExists(false)
  //   })

  //   console.log(emailExists)
  // }
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
          {/* {emailExists && <p className="error">This email is already taken</p>} */}
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
          <Link to="#" className="social">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link to="#" className="social">
            <i className="fa-brands fa-google"></i>
          </Link>
        </div>
        <div className="btn-mobile">
          <button type="button" onClick={toggle}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
