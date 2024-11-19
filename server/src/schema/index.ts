import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
    habits: [Habit!]!
    journalEntries: [JournalEntry!]!
    sleepLogs: [SleepLog!]!
    waterIntakeLogs: [WaterIntakeLog!]!
  }

  type Habit {
    id: ID!
    name: String!
    frequency: String!
    progress: Float!
    userId: ID!
  }

  type JournalEntry {
    id: ID!
    content: String!
    mood: String
    tags: [String!]
    createdAt: String!
    userId: ID!
  }

  type SleepLog {
    id: ID!
    date: String!
    duration: Float!
    quality: Int
    userId: ID!
  }

  type WaterIntakeLog {
    id: ID!
    date: String!
    amount: Int!
    userId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    habits: [Habit!]!
    journalEntries: [JournalEntry!]!
    sleepLogs: [SleepLog!]!
    waterIntakeLogs: [WaterIntakeLog!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createHabit(name: String!, frequency: String!): Habit!
    updateHabitProgress(id: ID!, progress: Float!): Habit!
    createJournalEntry(
      content: String!
      mood: String
      tags: [String!]
    ): JournalEntry!
    logSleep(date: String!, duration: Float!, quality: Int): SleepLog!
    logWaterIntake(date: String!, amount: Int!): WaterIntakeLog!
  }
`;
