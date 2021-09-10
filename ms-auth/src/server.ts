import { app } from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Auth Service running at port ${port}`);
});
