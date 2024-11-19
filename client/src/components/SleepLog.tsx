import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const LOG_SLEEP = gql`
  mutation LogSleep($date: String!, $duration: Float!, $quality: Int) {
    logSleep(date: $date, duration: $duration, quality: $quality) {
      id
      date
      duration
      quality
    }
  }
`;

const SleepLog: React.FC = () => {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [quality, setQuality] = useState("");

  const [logSleep] = useMutation(LOG_SLEEP);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logSleep({
      variables: {
        date,
        duration: parseFloat(duration),
        quality: quality ? parseInt(quality) : null,
      },
    });
    setDate("");
    setDuration("");
    setQuality("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Sleep Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (hours)"
          step="0.1"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          placeholder="Quality (1-5)"
          min="1"
          max="5"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log Sleep
        </button>
      </form>
    </div>
  );
};

export default SleepLog;
