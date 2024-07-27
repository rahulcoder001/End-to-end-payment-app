import "../app/globals.css"

interface HomecardProps {
    condition: boolean;
    balance: number;
    email: string;
    number: string;
    name: string;
    button1:()=>void;
    button2:()=>void;
  }
  
  export const Homecard = ({ condition, balance, email, number, name , button1 , button2 }: HomecardProps) => {
    if (condition) {
      return (
        <div>
          <div className="p-2 ml-10 text-4xl font-bold">Personal Details</div>
          <div className="flex ml-10">
            <div className="mt-10 font-semibold text-slate-500 p-2">
              <div className="p-2">Legal Name</div>
              <div className="p-2">Email</div>
              <div className="p-2">Phone Number</div>
              <div className="p-2">Country</div>
            </div>
            <div className="m-10 p-2 mt-10 font-semibold">
              <div className="p-2">{name}</div>
              <div className="p-2">{email}</div>
              <div className="p-2">{number}</div>
              <div className="p-2">India</div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div>
        <div>
          <div className="font-semibold text-sm text-slate-500 p-2 border-b-2">Your wallet balance</div>
          <div className="p-2 text-5xl font-bold">${balance}</div>
        </div>
        <div className="mt-10">
          <div className="p-2">
            <button onClick={button1} className="border-black rounded-lg bg-purple-600 hover:bg-purple-400 font-bold text-white p-2 text-sm">
              Add Money to wallet
            </button>
            <button onClick={button2} className="ml-2 rounded-lg bg-purple-600 hover:bg-purple-400 font-bold text-white border-black text-sm p-2">
              Pay by wallet
            </button>
          </div>
        </div>
      </div>
    );
  };