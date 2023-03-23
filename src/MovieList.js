import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { API } from "./global";

export function MovieList() {

  const [movieList, setMovieList] = useState([]);


  const getMovies = () => {
    fetch(`${API}/movies`, { method: "GET" })
      .then((data) => data.json())
      .then((movies) => setMovieList(movies))
  }
  useEffect(() => getMovies(), []);

  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, { method: "DELETE" })
      .then((data) => getMovies())
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="movie-list">
        {movieList.map((mv) => (<Movie key={mv.id} movie={mv} id={mv.id} deleteButton={<IconButton color="error" onClick={() => deleteMovie(mv.id)}><DeleteIcon /></IconButton>} editButton={
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => navigate(`/movies/edit/${mv.id}`)}
            aria-label="edit"
            color="primary"
          >
            <EditIcon />
          </IconButton>
        } />))}
      </div>
    </div>

  );
}
