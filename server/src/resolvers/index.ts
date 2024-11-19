import { IResolvers } from "@graphql-tools/utils";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Habit from "../models/Habit";
import JournalEntry from "../models/JournalEntry";
import SleepLog from "../models/SleepLog";
import WaterIntakeLog from "../models/WaterIntakeLog";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return User.findById(user.id);
    },
    habits: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return Habit.find({ userId: user.id });
    },
    journalEntries: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return JournalEntry.find({ userId: user.id });
    },
    sleepLogs: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return SleepLog.find({ userId: user.id });
    },
    waterIntakeLogs: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      return WaterIntakeLog.find({ userId: user.id });
    },
  },
  Mutation: {
    signup: async (_, { email, password, name }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError("Email already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, name });
      await user.save();
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError("No user found with this email");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Invalid password");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
      return { token, user };
    },
    createHabit: async (_, { name, frequency }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const habit = new Habit({ name, frequency, userId: user.id });
      return habit.save();
    },
    updateHabitProgress: async (_, { id, progress }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const habit = await Habit.findOneAndUpdate(
        { _id: id, userId: user.id },
        { progress },
        { new: true }
      );
      if (!habit) throw new UserInputError("Habit not found");
      return habit;
    },
    createJournalEntry: async (_, { content, mood, tags }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const entry = new JournalEntry({ content, mood, tags, userId: user.id });
      return entry.save();
    },
    logSleep: async (_, { date, duration, quality }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const sleepLog = new SleepLog({
        date,
        duration,
        quality,
        userId: user.id,
      });
      return sleepLog.save();
    },
    logWaterIntake: async (_, { date, amount }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const waterIntakeLog = new WaterIntakeLog({
        date,
        amount,
        userId: user.id,
      });
      return waterIntakeLog.save();
    },
  },
};
