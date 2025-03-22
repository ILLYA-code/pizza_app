import express, { Request, Response } from "express";
import cors from "cors";  
import client from "./db"; 

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST',  
  allowedHeaders: 'Content-Type, Authorization' 
}));


app.get("/users", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
