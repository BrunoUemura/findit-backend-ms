import express from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.post("/api/event", (req, res) => {
  const data = req.body;

  if (data.type === "User Creaton") {
    axios.post("http://localhost:4001/api/users", {
      type: "User Creaton",
      name: data.name,
      email: data.email,
    });
  }

  console.log(data);
});

app.listen(3999, () => {
  console.log(`Server running on port 3999`);
});
