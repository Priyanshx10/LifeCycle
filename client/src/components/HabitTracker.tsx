import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_HABITS = gql`
  query GetHabits {
    habits {
      id
      name
      frequency
      progress
    }
  }
`;

const UPDATE_HABIT_PROGRESS = gql`
  mutation UpdateHabitProgress($id: ID!, $progress: Float!) {
    updateHabitProgress(id: $id, progress: $progress) {
      id
      progress
    }
  }
`;

const HabitTracker: React.FC = () => {
  const { loading, error, data } = useQuery(GET_HABITS);
  const [updateHabitProgress] = useMutation(UPDATE_HABIT_PROGRESS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Habit Tracker</h2>
      <ul>
        {data.habits.map((habit: any) => (
          <li key={habit.id} className="mb-4">
            <p>{habit.name}</p>
            <input
              type="range"
              min="0"
              max="100"
              value={habit.progress}
              onChange={(e) => {
                updateHabitProgress({
                  variables: {
                    id: habit.id,
                    progress: parseFloat(e.target.value),
                  },
                });
              }}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
