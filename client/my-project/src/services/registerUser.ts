export default async function registerUser (name: string, email: string, password: string) {
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
            // console.log("User registered successfully");
            return { success: true };
        } else {
            const data = await response.json();
            // console.error(data.error);
            return { success: false, error: data.error};
        }
    } catch (error: unknown) {
        // console.error("Error:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "An unknown error occurred" };
    }
};