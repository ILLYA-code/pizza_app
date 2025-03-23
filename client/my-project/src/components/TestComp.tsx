import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}



// const registerUser = async (name: string, email: string, password: string) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//       credentials: "include", // Додаємо credentials для роботи з cookies
//     });

//     if (response.ok) {
//       console.log("User registered successfully");
//     } else {
//       const data = await response.json();
//       console.error(data.error);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// registerUser("please", "please@pls.com", "pls1234");


export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error("Loading error:", err));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Users list</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}), {user.age} yo
          </li>
        ))}
      </ul>
    </div>
  );
}
