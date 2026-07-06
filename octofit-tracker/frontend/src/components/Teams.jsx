import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/api/teams/'))
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setTeams(normalizeItems(data));
        }
      })
      .catch(() => {
        if (!ignore) {
          setTeams([]);
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
    return <div>Loading teams...</div>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
            <th>Captain</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id || team.id}>
              <td>{team.name}</td>
              <td>{team.members?.length || 0}</td>
              <td>{team.captain?.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
