import express, {Request, Response} from "express";
import cors from "cors";
import chartRoutes from "./routes/chartRoutes";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Backend is Working");
})


// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/charts", chartRoutes);

export default app;