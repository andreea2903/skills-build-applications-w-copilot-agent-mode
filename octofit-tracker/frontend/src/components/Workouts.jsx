import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/api/workouts/'))
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setWorkouts(normalizeItems(data));
        }
      })
      .catch(() => {
        if (!ignore) {
          setWorkouts([]);
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
    return <div>Loading workouts...</div>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id || workout.id}>
              <td>{workout.name}</td>
              <td>{workout.type}</td>
              <td>{workout.durationMinutes} min</td>
              <td>{workout.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
