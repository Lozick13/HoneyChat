import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { isTokenValid } from './helpers/token';
import { useAppDispatch } from './hooks';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';
import { setUser } from './redux/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // token validation, get data
  const token = localStorage.getItem('token');
  const { valid: tokenIsValid, data: tokenData } = isTokenValid(token);

  // if the token is valid and contains data, set the user to Redux
  useEffect(() => {
    if (tokenIsValid && tokenData) {
      const { id, name, email, chats } = tokenData;
      dispatch(setUser({ id, name, email, chats }));
    }
  }, [tokenIsValid, tokenData, dispatch]);

  // authorization check
  const requireAuth = (children: React.ReactNode) => {
    return tokenIsValid ? children : <Navigate to="/auth" replace />;
  };

  return (
    <>
      {!['/auth', '/signup'].includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/chats" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chats" element={requireAuth(<ChatsPage />)} />
      </Routes>
    </>
  );
}

export default App;
