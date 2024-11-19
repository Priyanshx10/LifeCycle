import React from "react";
import HabitTracker from "./HabitTracker";
import JournalEntry from "./JournalEntry";
import SleepLog from "./SleepLog";
import WaterIntake from "./WaterIntake";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HabitTracker />
        <JournalEntry />
        <SleepLog />
        <WaterIntake />
      </div>
    </div>
  );
};

export default Dashboard;
