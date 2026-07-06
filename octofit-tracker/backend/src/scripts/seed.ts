import mongoose from 'mongoose';
import User from '../models/User.ts';
import Team from '../models/Team.ts';
import Activity from '../models/Activity.ts';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';
import Workout from '../models/Workout.ts';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.create([
      {
        name: 'Cardio Crushers',
        description: 'Fast-paced endurance training team',
        members: []
      },
      {
        name: 'Strength Squad',
        description: 'Team focused on strength and conditioning',
        members: []
      }
    ]);

    const users = await User.create([
      {
        name: 'Ava Rivera',
        email: 'ava.rivera@example.com',
        role: 'student',
        team: teams[0]._id,
        goals: ['Improve endurance', 'Run a 5K']
      },
      {
        name: 'Miles Bennett',
        email: 'miles.bennett@example.com',
        role: 'student',
        team: teams[1]._id,
        goals: ['Increase upper body strength', 'Complete 25 push-ups']
      },
      {
        name: 'Coach Harper',
        email: 'coach.harper@example.com',
        role: 'coach',
        goals: ['Track team performance', 'Encourage consistency']
      }
    ]);

    teams[0].members = [users[0]._id];
    teams[1].members = [users[1]._id];
    await Promise.all([teams[0].save(), teams[1].save()]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 30,
        caloriesBurned: 320,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        user: users[0]._id,
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 430,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 35,
        caloriesBurned: 290,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, points: 780, rank: 1 },
      { user: users[1]._id, points: 650, rank: 2 },
      { team: teams[0]._id, points: 780, rank: 1 },
      { team: teams[1]._id, points: 650, rank: 2 }
    ]);

    await Workout.create([
      {
        name: 'Morning HIIT Circuit',
        category: 'Cardio',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        description: 'A fast-paced interval workout designed to improve stamina and burn calories.'
      },
      {
        name: 'Strength Builder',
        category: 'Strength',
        durationMinutes: 35,
        difficulty: 'Advanced',
        description: 'Compound lifts and bodyweight exercises to build full-body strength.'
      },
      {
        name: 'Recovery Stretch',
        category: 'Flexibility',
        durationMinutes: 20,
        difficulty: 'Beginner',
        description: 'Gentle stretches to improve mobility and support recovery.'
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
