import { app } from "./app";

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Users Service running at port ${port}`);
});
