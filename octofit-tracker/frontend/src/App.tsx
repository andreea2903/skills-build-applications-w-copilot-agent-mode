import { Route, Routes, NavLink } from 'react-router-dom';
import Users from './pages/Users';
import Activities from './pages/Activities';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <nav>
          <NavLink className="me-3" to="/users">
            Users
          </NavLink>
          <NavLink className="me-3" to="/activities">
            Activities
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="*" element={<div>Select a page from the menu.</div>} />
      </Routes>
    </div>
  );
}

export default App;
