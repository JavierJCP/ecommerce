import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/ProductContext';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleSing = () => {
    if (state.user) {
      signOut(auth);
      dispatch({
        type: 'EMPTY_BASKET',
        basket: [],
        user: null,
      });

      navigate('/');
    }
  };

  return (
    <Box>
      <AppBar position='fixed' color='secondary'>
        <Toolbar>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Grid item>
              <Link to='/'>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 1 }}
                >
                  <img
                    src='https://res.cloudinary.com/djhxoyinm/image/upload/v1663539919/eCommerce/nike-9-svg_ia8x1x.webp'
                    alt='logo de Nike'
                  />
                </IconButton>
              </Link>
            </Grid>
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='h6'
                component='p'
                color='textPrimary'
                sx={{ mr: 1 }}
              >
                Hello {state.user ? state.user.email : 'Guest'}
              </Typography>

              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <Button
                  variant='outlined'
                  sx={{ whiteSpace: 'noWrap', ml: 2, mr: 2 }}
                  onClick={handleSing}
                >
                  <Typography color='textPrimary'>
                    {state.user ? 'Sing Out' : 'Sign In'}
                  </Typography>
                </Button>
              </Link>

              <Link to='checkout'>
                <IconButton color='inherit'>
                  <Badge badgeContent={state.basket?.length} color='error'>
                    <ShoppingCart fontSize='large' color='primary' />
                  </Badge>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
