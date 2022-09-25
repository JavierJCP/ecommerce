import './App.css';
import CheckoutPage from './components/CheckoutPage';
import Navbar from './components/Navbar';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
import { auth } from './auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './context/ProductContext';
import Checkout from './components/CheckoutForm/Checkout';

function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      }
      console.log(state.user);
    });
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='checkoutPage' element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
