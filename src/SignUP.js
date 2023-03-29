import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { API } from "./global";


const movieValidationSchema = yup.object({
  password: yup.string()
    .min(8, "make password must be strong")
    .required("Upper & Lower case needed"),
  email: yup.string()
    .min(10, 'example@email.com')
    .required()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
})
export function SignUP() {

  const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (values) => {
      addUser(values);
    }
  });

  const navigate = useNavigate();

  const addUser = (values) => {
    fetch(`${API}/movies/users/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate('/movies'))
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="header">Signup</h2>
      <span className="header">Wlecome to Movie App</span>
      <TextField
        variant="outlined"
        id="outlined-basic"
        label='Username'
        value={values.email}
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email ? errors.email : null}
      <TextField
        variant="outlined"
        id="outlined-basic"
        label='Password'
        value={values.password}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password ? errors.password : null}
      <Button variant="contained" type="submit" color="success">Register</Button>
      <div className="signup-footer">
        Already have an account <Link to="/users/login" className="color" >Login</Link> here.
      </div>
    </form>
  );
}
