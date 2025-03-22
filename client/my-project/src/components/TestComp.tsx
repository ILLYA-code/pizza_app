import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

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
