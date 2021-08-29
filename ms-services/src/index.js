const customExpress = require("./config/customExpress");
const app = customExpress();

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;