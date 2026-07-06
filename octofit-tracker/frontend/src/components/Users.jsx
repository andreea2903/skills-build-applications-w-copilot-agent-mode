import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/api/users/'))
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setUsers(normalizeItems(data));
        }
      })
      .catch(() => {
        if (!ignore) {
          setUsers([]);
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
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.team?.name || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
