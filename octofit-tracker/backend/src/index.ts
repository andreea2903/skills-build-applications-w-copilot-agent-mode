import './config/database.ts';
import express from 'express';
import usersRouter from './routes/users.ts';
import teamsRouter from './routes/teams.ts';
import activitiesRouter from './routes/activities.ts';
import leaderboardRouter from './routes/leaderboard.ts';
import workoutsRouter from './routes/workouts.ts';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/config', (_req, res) => {
  const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;

  res.json({
    apiUrl: apiHost,
    port,
    codespaceName: codespaceName || null
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  if (codespaceName) {
    console.log(`Codespace API endpoint: https://${codespaceName}-8000.app.github.dev`);
  }
});
