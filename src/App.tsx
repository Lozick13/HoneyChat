import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatsPage from './pages/ChatsPage/ChatsPage';
import SignUpPage from './pages/SugnUpPage/SignUpPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chats" index element={<ChatsPage />} />
      </Routes>
    </>
  );
}

export default App;
