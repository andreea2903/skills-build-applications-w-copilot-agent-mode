import './config/database';
import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

export const app = express();
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

export const startServer = () => {
  return app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    if (codespaceName) {
      console.log(`Codespace API endpoint: https://${codespaceName}-8000.app.github.dev`);
    }
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
