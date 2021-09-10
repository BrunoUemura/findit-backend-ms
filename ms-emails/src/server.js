import app from "./app.js";

const port = process.env.PORT || 4003;

app.listen(port, () => {
  console.log(`Emails Service running at port ${port}`);
});
