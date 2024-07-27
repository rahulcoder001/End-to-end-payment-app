"use client";

import { Histry } from "@/component/Histry";
import axios from "axios";
import { useEffect, useState } from "react";

const RecentTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getOnRampTransactions() {
      const response = await axios.get('/api/recent');
      const formattedTransactions = response.data.map((t: any) => ({
        ...t,
        time: new Date(t.time)
      }));
      setTransactions(formattedTransactions);
    }

    getOnRampTransactions();
  }, []);

  return (
    <div>
      <Histry transactions={transactions} />
    </div>
  );
};

RecentTransactionsPage.displayName = "RecentTransactionsPage";

export default RecentTransactionsPage;
