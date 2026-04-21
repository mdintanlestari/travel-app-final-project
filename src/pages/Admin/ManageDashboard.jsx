import axios from "axios";
import React, { useEffect, useState } from "react";

function ManageDashboard() {
  const [stat, setStat] = useState({
    users: 0,
    activities: 0,
    promos: 0,
    transactions: 0,
  });

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, activitiesRes, PromosRes, TransactionRes] =
          await Promise.all([
            axios.get(
              "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
              },
            ),
            axios.get(
              "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
              },
            ),
            axios.get(
              "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
              },
            ),
            axios.get(
              "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
              },
            ),
          ]);
        setStat({
          users: usersRes.data.data.length,
          activities: activitiesRes.data.data.length,
          promos: PromosRes.data.data.length,
          transactions: TransactionRes.data.data.length,
        });
      } catch (err) {
        console.error("Error fetch data", err);
      }
    };
    fetchStat();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
        <div className="p-4 bg-white rounded shadow">
          <p>Total Users</p>
          <h2 className="text-2xl font-bold">{stat.users}</h2>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p>Total Activities</p>
          <h2 className="text-2xl font-bold">{stat.activities}</h2>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p>Total Promos</p>
          <h2 className="text-2xl font-bold">{stat.promos}</h2>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p>Total Transactions</p>
          <h2 className="text-2xl font-bold">{stat.transactions}</h2>
        </div>
      </div>
    </div>
  );
}

export default ManageDashboard;
