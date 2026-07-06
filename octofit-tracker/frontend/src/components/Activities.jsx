import { useEffect, useState } from 'react';
import { getApiUrl, normalizeItems } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch(getApiUrl('/api/activities/'))
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setActivities(normalizeItems(data));
        }
      })
      .catch(() => {
        if (!ignore) {
          setActivities([]);
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
    return <div>Loading activities...</div>;
  }

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id || activity.id}>
              <td>{activity.user?.name || 'Unknown'}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes} min</td>
              <td>{activity.caloriesBurned}</td>
              <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
