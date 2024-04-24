const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({origin: true}));
app.use(bodyParser.json());

app.get("/players", (req: any, res: any) => {
    res.json( [
            {
                "firstName": "Rohit",
                "lastName": "Sharma",
                "team": "Mumbai"
            },
            {
                "firstName": "Ishan",
                "lastName": "Kishan",
                "team": "Mumbai"
            },
            {
                "firstName": "MS",
                "lastName": "Dhoni",
                "team": "Chennai"
            },
            {
                "firstName": "Ravindra",
                "lastName": "Jadeja",
                "team": "Chennai"
            },
            {
                "firstName": "Virat",
                "lastName": "Kohli",
                "team": "Rcb"
            },
            {
                "firstName": "Dinesh",
                "lastName": "Karthik",
                "team": "Rcb"
            }
        ]
    )
});

const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});