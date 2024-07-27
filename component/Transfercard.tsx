"use client";
import "../app/globals.css"
import { useState } from "react";

// Define supported banks
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
  }
];

// Define the Select component
const Select = ({
  options,
  onSelect
}: {
  onSelect: (value: string) => void;
  options: { key: string; value: string }[];
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

// Define the Transfercard component
export const Transfercard = ({ onsubmit }: { onsubmit: ({ amount, provider }: { amount: number; provider: string }) => void }) => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState('HDFC Bank');

  return (
    <div className="m-2 bg-white shadow-md">
      <p className="font-semibold border-b-2 p-1">Transfer Money</p>
      <div className="flex flex-col p-2">
        <label htmlFor="amount" className="p-1">Amount</label>
        <div className="border-2 rounded-lg p-1">
          <input
            id="amount"
            type="number"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
            placeholder="Enter Amount"
            className="outline-none rounded-lg pl-1 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col p-2 mb-8">
        <p className="p-1">Bank</p>
        <Select
          onSelect={(value) => {
            const bank = SUPPORTED_BANKS.find(x => x.name === value);
            setRedirectUrl(bank ? bank.redirectUrl : "");
            setProvider(value);
          }}
          options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
          }))}
        />
      </div>
      <div className="m-2 flex justify-center">
        <button
          onClick={async () => {
            await onsubmit({ amount, provider });
            window.location.href = redirectUrl || "";
          }}
          className="p-2 font-semibold text-sm rounded-lg m-2 text-white bg-purple-600 hover:bg-purple-500"
        >
          ADD Money
        </button>
      </div>
    </div>
  );
};
