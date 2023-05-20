import { Button, Card, TextField } from '@mui/material';
import React from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { API } from './global';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function LoginForm(){

    const navigate = useNavigate();

    React.useEffect(()=>{
        if(localStorage.getItem("token")) navigate("/")
    })
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            // console.log(values);

            const data = await fetch(`${API}/users/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values)
            })

            if (data.status === 401) {
                toast.error ("Login Failed");
                console.log("Login Failed");
            } else {
                const result = await data.json();
                toast.success("Login Success");
                localStorage.setItem("token",result.token)
                navigate("/")
            }

        }
    })


    return (
        <form className='login' onSubmit={handleSubmit}>
            <Card className='login-card'>
                <h2><VpnKeyIcon /> Sign In</h2>
                <div className='login-input'>
                    <TextField
                        name="username"
                        label="User Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={values.username}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    <Button variant="contained" type="submit" color='error'>Login<LoginIcon /></Button>

                    <p className='text'>Don't have an account <span onClick={() => navigate(`/users/signup`)} className='nav'>Register</span> here</p>
                </div>
            </Card>
        </form>
    )
}