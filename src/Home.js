import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Movie App</h1>
      <Button onClick={() => navigate('/movies')} variant='contained'>Go to Movies</Button>
    </div>
  );
}
