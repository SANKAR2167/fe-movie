import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { API } from "./global";


const movieValidationSchema = yup.object({
    name: yup.string().required().min(3),
    image: yup.string().required().min(10).url(),
    rating: yup.number().required().min(0).max(10),
    summary: yup.string().required().min(100),
    trailer: yup.string().required().min(10).url(),
})

export function EditMovie() {
    const { id } = useParams();
    //const movie = movieList[id];

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`${API}/movies/${id}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((mv) => setMovie(mv));
    }, []);


    // console.log(movie);

    return <div className="edit-loading">

        {movie ? <EditFormMovie movie={movie} /> : "Loading..."}
    </div>
}

function EditFormMovie({ movie }) {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        useFormik({
            initialValues: {
                name: movie.name,
                poster: movie.poster,
                rating: movie.rating,
                summary: movie.summary,
                trailer: movie.trailer,
            },
            validationSchema: movieValidationSchema,
            onSubmit: async (updatedMovie) => {
                console.log("Form values: ", updatedMovie);
                // await editMovie(updatedMovie);
                await fetch(`${API}/movies/${movie._id}`, {
                    method: "PUT",
                    body: JSON.stringify(updatedMovie),
                    headers: { "Content-type": "application/json" },
                }).then(() => navigate("/movies"))
            },
        });

    const navigate = useNavigate();

    // const editMovie = async (updatedMovie) => () => {

    //      fetch(`${API}/movies/${movie.id}`, {
    //         method: "PUT",
    //         body: JSON.stringify(updatedMovie),
    //         headers: { "Content-type": "application/json" },
    //     }).then(() => navigate("/movies"))
    // };

    return (
        <form className="edit-movie-form">
            <TextField
                label="Name"
                variant="outlined"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name ? errors.name : null}
            />


            <TextField
                label="Poster"
                variant="outlined"
                value={values.poster}
                name="poster"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.poster && errors.poster}
                helperText={touched.poster && errors.poster ? errors.poster : null}
            />


            <TextField
                label="Rating"
                variant="outlined"
                value={values.rating}
                name="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rating && errors.rating}
                helperText={touched.rating && errors.rating ? errors.rating : null}
            />


            <TextField
                label="Summary"
                variant="outlined"
                value={values.summary}
                name="summary"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.summary && errors.summary}
                helperText={touched.summary && errors.summary ? errors.summary : null}
            />


            <TextField
                label="Trailer"
                variant="outlined"
                value={values.trailer}
                name="trailer"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.trailer && errors.trailer}
                helperText={touched.trailer && errors.trailer ? errors.trailer : null}
            />


            <Button
                color="success"
                onClick={handleSubmit}
                variant="contained"
            >
                Save
            </Button>
        </form>
    );
}