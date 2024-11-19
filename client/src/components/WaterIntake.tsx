import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const LOG_WATER_INTAKE = gql`
  mutation LogWaterIntake($date: String!, $amount: Int!) {
    logWaterIntake(date: $date, amount: $amount) {
      id
      date
      amount
    }
  }
`;

const WaterIntake: React.FC = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const [logWaterIntake] = useMutation(LOG_WATER_INTAKE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logWaterIntake({
      variables: { date, amount: parseInt(amount) },
    });
    setDate("");
    setAmount("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Water Intake</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (ml)"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log Water Intake
        </button>
      </form>
    </div>
  );
};

export default WaterIntake;
