import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { RequireAuth } from './components/RequiredAuth';
import { Sign } from './pages/SignPage/Sign';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={
              <>
                <Sign />
              </>
            }
          />
          <Route
            path='/'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
