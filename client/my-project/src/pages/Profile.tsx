import { useState } from "react";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Вхід" : "Реєстрація"}
        </h1>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Ім'я"
              className="w-full p-2 border-[1px solid black] rounded-md focus:ring focus:ring-blue-300"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            {isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Немає акаунту?" : "Вже є акаунт?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Зареєструватися" : "Увійти"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Profile;
