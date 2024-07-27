import "../app/globals.css"

interface AppbarProps {
    user:boolean
    onSignin: () => void;
    onSignout: () => void;
  }
  
  export default function Appbar({ user, onSignin, onSignout }: AppbarProps) {
    return (
      <div className="bg-red-50 flex justify-between">
        <div className="flex font-extrabold text-3xl p-2 text-purple-600 font-serif"><p className=" text-4xl">RM</p><p className="mt-1">Pay</p></div>
        <div className=" flex items-center">
          {user ? (
            <div>
              <button className="p-2 mr-2 text-white bg-purple-600 rounded-2xl font-medium" onClick={onSignout}>Logout</button>
            </div>
          ) : (
            <div>
              <button className="p-2 font-semibold  text-white bg-purple-600 rounded-2xl px-6 rounded-lg px-4"onClick={onSignin}>Login</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  