import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'crud'
});

db.connect(error => {
    if(error){
        console.log("DB Connection error");
    }
    else{
        console.log("MySQL connected");
    }
});


const server = express();
var corsOptions = {
    origin: ["http://localhost:4200"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
server.use(cors(corsOptions));
server.use(express.json());

//GET ALL POSTS
server.get('/posts', (req,res) => {
    let query = 'CALL `GetPosts`()';
    db.query(query, (error, results) => {
        if(error){
            res.json({ data: false, message: error });
        }
        else{
            res.json({data: results[0], message: "Success"});
        }
    })
});

server.post('/posts', (req, res) => {
    let query = "CALL `NewPost`(?)";
    db.query( query, req.body.newpost, (error, newpostfromSQL) => {
        if(error){
            res.json({ newpost: false, message: error });
        }
        else{
            res.json({ newpost: newpostfromSQL, message: "new post inserted"});
        }
    } )
})



server.listen(4400, function(){
    console.log('server running at port 4400');
});