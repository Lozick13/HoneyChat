import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" index element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
