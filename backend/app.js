const express = require('express');
const app = express();
const dotenv = require("dotenv");

const cors = require('cors');
const UserAPI = require("./routes/user.js");
const TaskAPI = require("./routes/task.js");


require("./conn/conn.js");

dotenv.config();

app.use(express.json());
app.use(cors());


app.use("/api/user/", UserAPI);
app.use("/api/task/",TaskAPI);



// app.use("/", (req, res) => {
//     res.send("Helloiii");
// });

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});