export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include", // Додаємо credentials для роботи з cookies
        });
  
        if (response.ok) {
            console.log("User registered successfully");
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};


export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // Для роботи з cookies
        });
    
        if (response.ok) {
            console.log("Logged in successfully");
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
      console.error("Error:", error);
    }
};

export const refreshToken = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/refresh", {
            method: "POST",
            credentials: "include", // Важливо для роботи з cookie
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log("New access token:", data.accessToken);
        } else {
            console.error("Failed to refresh token");
        }
    } catch (error) {
      console.error("Error:", error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include", // Для роботи з cookies
        });
  
        if (response.ok) {
            console.log("Logged out successfully");
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

export const fetchUsers = async () => {
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