import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { isTokenValid } from './helpers/token';
import { useAppDispatch, useAppSelector } from './hooks';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import CreateChannelPage from './pages/CreateChannelPage/CreateChannelPage';
import JoinChannelPage from './pages/JoinChannelPage/JoinChannelPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';
import { setUser } from './redux/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(state => state.user);
  const location = useLocation();

  // token validation, get data
  const token = localStorage.getItem('token');
  const { valid: tokenIsValid, data: tokenData } = isTokenValid(token);

  // if the token is valid and contains data, set the user to Redux
  useEffect(() => {
    if (tokenIsValid && tokenData && !id) {
      const { id, name, email } = tokenData;
      dispatch(setUser({ id, name, email }));
    }
  }, [tokenIsValid, tokenData, dispatch, id]);

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
        <Route path="/profile" element={requireAuth(<ProfilePage />)} />
        <Route path="/chats" element={requireAuth(<ChatsPage />)} />
        <Route path="/join-channel" element={requireAuth(<JoinChannelPage />)} />
        <Route path="/create-channel" element={requireAuth(<CreateChannelPage />)} />
      </Routes>
    </>
  );
}

export default App;
