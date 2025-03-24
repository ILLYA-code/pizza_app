export default async function fetchUsers () {
    try {
        const response = await fetch("http://localhost:5000/users", {
            method: "GET",
            credentials: "include", // Важливо для того, щоб відправляти cookie
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log("Users:", data);
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};  