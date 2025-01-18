import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';

function App() {
  const location = useLocation();

  return (
    <>
      {!['/auth', '/signup'].includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </>
  );
}

export default App;
