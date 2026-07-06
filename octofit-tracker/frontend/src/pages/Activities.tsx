import { useEffect, useState } from 'react';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
  user: { name: string };
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activities')
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .finally(() => setLoading(false));
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
            <tr key={activity._id}>
              <td>{activity.user?.name || 'Unknown'}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes} min</td>
              <td>{activity.caloriesBurned}</td>
              <td>{new Date(activity.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
