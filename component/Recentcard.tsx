import React from "react";
import "../app/globals.css"
export const Recentcard = ({
  transactions
}: {
  transactions: {
    time: Date,
    amount: number,
    status: string,
    provider: string
  }[]
}) => {
  const newTransactions = [...transactions].reverse();

  if (!transactions.length) {
    return (
      <div className="m-2 bg-white h-40 flex justify-center items-center shadow-md">
        <div className="p-2 font-semibold text-slate-400">
          No recent transactions
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-5 m-2 bg-white shadow-md">
      {newTransactions.map(t => (
        <div className=" p-2" key={t.time.toString()}>
          {t.provider.split(" ")[0] === "ptop" ? (
            t.status==="recive"?<div className="flex justify-between font-bold text-sm">
              <div className="text-purple-600 font-semibold text-sm">Recive from {t.provider.split(" ")[1]}</div>
              <div className="text-green-500 font-semibold text-sm">+${(t.amount)}</div>
            </div>
            : <div className="flex justify-between font-bold text-sm">
                <div className="text-purple-600 font-semibold text-sm">send money to {t.provider.split(" ")[1]}</div>
                <div className="text-red-500 font-semibold text-sm">-${(t.amount)}</div>
            </div>
          ) : t.status === "processing" ? (
            <div className="flex justify-between font-bold text-sm">
              <div className=" text-purple-600">Processing...</div>
              <div className="text-yellow-300">+${(t.amount)}</div>
            </div>
          ) : (
            <div className="flex justify-between font-bold text-sm">
              <div className=" text-purple-600">Added successfully</div>
              <div className="text-green-500 ">+${(t.amount)}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
