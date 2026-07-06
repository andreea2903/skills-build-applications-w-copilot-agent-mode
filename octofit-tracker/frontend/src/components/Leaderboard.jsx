import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/api/leaderboard/'))
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setEntries(normalizeItems(data));
        }
      })
      .catch(() => {
        if (!ignore) {
          setEntries([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id || entry.id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name || 'Unknown'}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
