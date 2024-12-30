const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

const listItemRoutes = require("./routes/listItemRoutes");

app.use(bodyParser.json());

app.use("/", listItemRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});