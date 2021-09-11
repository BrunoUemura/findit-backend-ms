import { app } from "./app";

const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
