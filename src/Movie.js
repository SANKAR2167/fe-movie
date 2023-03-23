import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Card, CardActions, CardContent, IconButton } from '@mui/material';
import { useState } from 'react';
import { Counter } from './Counter';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

export function Movie({ movie, id, deleteButton, editButton }) {

  const styles = {
    color: movie.rating >= 8.5 ? 'green' : 'red',
  };

  const [show, setShow] = useState(true);


  const navigate = useNavigate();

  //style={styles.color} 
  return (
    <Card className='movie-container' >
      <img src={movie.poster} alt={movie.name} className='movie-poster' />
      <CardContent>
        <div className="movie-specs">
          <h3 className='movie-name'>{movie.name}
            <IconButton onClick={() => setShow(!show)} aria-label='toggle' color='primary'>
              {show ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>

            <IconButton onClick={() => navigate(`/movies/${id}`)} aria-label='toggle' color='primary'>
              <InfoIcon />
            </IconButton>

          </h3>
          <p className="movie-rating" style={styles}>⭐️{movie.rating}</p>
        </div>

        {show ? <p className="movie-summary">{movie.summary}</p> : null}

      </CardContent>
      <CardActions className='footer'><Counter /> {editButton}{deleteButton}</CardActions>
    </Card>
  );
}
