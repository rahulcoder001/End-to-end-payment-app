import React from "react";
import "../app/globals.css"
export const Histry = ({
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
    <div>
      <div className="mt-5 mx-2 bg-white shadow-md">
        {newTransactions.map(t => (
          <div className="p-2" key={t.time.toString()}>
            {t.provider.split(" ")[0] === "ptop" ? (
              t.status === "recive" ? (
                <div className="flex justify-between font-bold text-sm">
                  <div className="text-purple-600">
                    <p className="font-bold text-xl text-slate-400">Action</p> Receive from {t.provider.split(" ")[1]}
                  </div>
                  <div className="text-green-500">
                    <p className="font-bold text-xl text-slate-400">Status</p> success
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-400">Provider</p> {t.provider.split(" ")[2]}
                  </div>
                  <div className="text-green-500">
                    <p className="font-bold text-xl text-slate-400">Amount</p> +${(t.amount)}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between font-bold text-sm">
                  <div className="text-purple-600">
                    <p className="font-bold text-xl text-slate-400">Action</p> Add money to {t.provider.split(" ")[1]}
                  </div>
                  <div className="text-green-500">
                    <p className="font-bold text-xl text-slate-400">Status</p> success
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-400">Provider</p> {t.provider.split(" ")[2]}
                  </div>
                  <div className="text-red-500">
                    <p className="font-bold text-xl text-slate-400">Amount</p> -${t.amount}
                  </div>
                </div>
              )
            ) : t.status === "processing" ? (
              <div className="flex justify-between font-bold text-sm">
                <div className="text-purple-600">
                  <p className="font-bold text-xl text-slate-400">Action</p> Processing...
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-400">Status</p> {t.status}
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-400">Provider</p> {t.provider}
                </div>
                <div className="text-yellow-300">
                  <p className="font-bold text-xl text-slate-400">Amount</p> +${t.amount}
                </div>
              </div>
            ) : (
              <div className="flex justify-between font-bold text-sm">
                <div className="text-purple-600">
                  <p className="font-bold text-xl text-slate-400">Action</p> Added successfully
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-400">Status</p> {t.status}
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-400">Provider</p> {t.provider}
                </div>
                <div className="text-green-500">
                  <p className="font-bold text-xl text-slate-400">Amount</p> +${t.amount}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
