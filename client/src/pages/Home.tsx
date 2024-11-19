import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <Navigate to="/login" replace />;

  return (
    <div>
      <h1>Welcome, {data.me.name}!</h1>
      <Dashboard />
    </div>
  );
};

export default Home;
