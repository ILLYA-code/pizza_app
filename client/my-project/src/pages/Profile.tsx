import { useState, useRef, useEffect } from "react";

const Profile = () => {
  const [haveAcc, setHaveAcc] = useState(false);

  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const inputEmailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(haveAcc) {
      inputEmailRef.current?.focus();
    } else {
      inputNameRef.current?.focus();
    }
  })

  return (
    <div className="w-screen h-screen bg-cover bg-center flex justify-center items-center" style={{
      backgroundImage: "url('/images/pizza_neutral_bg_form.jpg')"
    }}>
      <div className="p-8 rounded-3xl bg-amber-50 border-4 border-amber-800 shadow-2xl max-w-[900px]">
        <form className="flex flex-col gap-4">
          <h2 className="text-black text-center text-2xl mb-2.5 font-bold">{haveAcc ? "Login" : "Registration"}</h2>

          {haveAcc ? (
            null
          ) : (
            <div className="flex flex-row items-center gap-4 justify-between">
              <label htmlFor="name" className="text-md font-medium text-gray-700">
                Your name
              </label>
              <input
                required
                ref={inputNameRef}
                id="name"
                type="text"
                placeholder="name..."
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
              />
            </div>
          )}

          <div className="flex flex-row items-center gap-4 justify-between">
            <label htmlFor="email" className="text-md font-medium text-gray-700">
              Your email
            </label>
            <input
              required
              ref={inputEmailRef}
              id="email"
              type="email"
              placeholder="email..."
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
            />
          </div>

          <div className="flex flex-row items-center gap-4 justify-between">
            <label htmlFor="password" className="text-md font-medium text-gray-700">
              {haveAcc ? "Your" : "Create a"} password
            </label>
            <input
              required
              id="password"
              type="password"
              placeholder="password..."
              autoComplete={haveAcc ? "off" : "new-password"}
              className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
            />
          </div>

          <input type="submit" value={haveAcc ? "Login" : "Register"} className="text-white p-2 w-full bg-amber-900 rounded-md cursor-pointer hover:bg-amber-700" />

          <div>
            <div className="flex flex-row items-center gap-4 justify-between">
              <label htmlFor="email" className="text-md font-medium text-gray-700">
                {haveAcc ? "Don't have an account?" : "Already have an account?"}
              </label>
              <input
                id="toLogin"
                type="button"
                value={haveAcc ? "Register" : "Login"}
                onClick={ () => { setHaveAcc(!haveAcc) } }
                className="text-amber-900 border-2 border-amber-900 rounded-md p-2 px-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
