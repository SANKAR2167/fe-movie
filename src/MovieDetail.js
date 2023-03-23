import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export function MovieDetail() {

  const { id } = useParams();
  // const movie = movieList[id];

  const [movie, setMovieList] = useState([]);

  useEffect(()=>{
    fetch(`https://638af1ba7220b45d22850b2c.mockapi.io/movies/${id}`, {method:"GET"})
      .then((data) => data.json())
      .then((movies) => setMovieList(movies))
    }, []);

  const styles = {
    color: movie.rating >= 8.5 ? 'green' : 'red',
  };

  const navigate = useNavigate();
  return (
    <div className="movie-detail">
      <iframe width="100%" height="800px" src={movie.trailer} title={movie.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      <div className="movie-detail-container">
        <div className="movie-specs">
          <h3 className='movie-name'>{movie.name}</h3>
          <p className="movie-rating" style={styles}>⭐️{movie.rating}</p>
        </div>
        <p className="movie-summary">{movie.summary}</p>

        <Button variant='contained' onClick={() => navigate(-1)}><KeyboardBackspaceIcon />  Back</Button>
      </div>
    </div>
  );
}
