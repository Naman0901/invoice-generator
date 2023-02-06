const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


var admin = require('./routers/admin');
app.use(admin);


app.listen(3000, () => {
    console.log("listening on port 3000");
})
