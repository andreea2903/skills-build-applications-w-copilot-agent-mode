import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="mb-3">OctoFit Tracker</h1>
        <p className="text-muted">
          Configure VITE_CODESPACE_NAME in .env.local to use the Codespaces API endpoint.
        </p>
        <nav className="d-flex flex-wrap gap-3">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
          <NavLink className="nav-link" to="/activities">
            Activities
          </NavLink>
          <NavLink className="nav-link" to="/teams">
            Teams
          </NavLink>
          <NavLink className="nav-link" to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className="nav-link" to="/workouts">
            Workouts
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<div>Select a page from the menu.</div>} />
      </Routes>
    </div>
  );
}

export default App;
