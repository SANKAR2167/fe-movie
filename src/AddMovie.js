import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from "./global";

const movieValidationSchema = yup.object({
  name: yup.string().required().min(3),
  image: yup.string().required().min(10).url(),
  rating: yup.number().required().min(0).max(10),
  summary: yup.string().required().min(100),
  trailer: yup.string().required().min(10).url(),
})
export function AddMovie() {

  const {handleBlur, handleSubmit, values,handleChange,touched,errors} = useFormik({
    initialValues: {
      name: "",
      image: "",
      rating: "",
      summary: "",
      trailer: "",
    },
    validationSchema: movieValidationSchema,
    onSubmit: (newMovie) => {
      addMovie(newMovie);
    }
  });

  const navigate = useNavigate();

  // const [name, setName] = useState('');
  // const [poster, setPoster] = useState('');
  // const [rating, setRating] = useState('');
  // const [summary, setSummary] = useState('');
  // const [trailer, setTrailer] = useState('');

  const addMovie = (newMovie) => {
    fetch(`${API}/movies`, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate('/movies'))
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Movie Name"
        variant="outlined"
        onChange={handleChange}
        value={values.name}
        onBlur={handleBlur}
      />
      {touched.name && errors.name ? errors.name : null}
      <TextField
        name="image"
        label="Movie Poster URL"
        variant="outlined"
        onChange={handleChange}
        value={values.image}
        onBlur={handleBlur}
      />
      {touched.image && errors.image ? errors.image : null}
      <TextField
        name="rating"
        label="Movie Rating"
        variant="outlined"
        type="number"
        onChange={handleChange}
        value={values.rating}
        onBlur={handleBlur}
      />
      {touched.rating && errors.rating ? errors.rating : null}
      <TextField
        name="summary"
        label="Movie Summary"
        variant="outlined"
        onChange={handleChange}
        value={values.summary}
        onBlur={handleBlur}
      />
      {touched.summary && errors.summary ? errors.summary : null}
      <TextField
        name="trailer"
        label="Movie Trailer URL"
        variant="outlined"
        onChange={handleChange}
        value={values.trailer}
        onBlur={handleBlur}
      />
      {touched.trailer && errors.trailer ? errors.trailer : null}
      <Button variant="contained" type="submit">Add Movie</Button>
    </form>
  );
}
