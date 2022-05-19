import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const fileupload = multer({ storage: storage });


const server = express();
var corsOptions = {
    origin: ["http://localhost:4200"],
    optionsSuccessStatus: 200 // For legacy browser support
    }
server.use(cors(corsOptions));
server.use(express.json());

//File upload API
server.post('/upload', fileupload.single("image") , (req, res) => {
    console.log(req.file);
})


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
            res.json({ newpost: newpostfromSQL[0], message: "new post inserted"});
        }
    } )
});

server.delete('/posts/:id', (req, res) => {
    let query = 'CALL `DeletePost`(?)';
    db.query( query, [req.params.id], (error, deleteSuccess) => {
        if(error){
            res.json({ deleteSuccess: false, message: error });
        }
        else{
            if(deleteSuccess[0][0].DEL_SUCCESS == 0){
                res.json({ deleteSuccess: deleteSuccess[0][0].DEL_SUCCESS, message: "ID not found"});
            }
            else{
                res.json({ deleteSuccess: deleteSuccess[0][0].DEL_SUCCESS, message: "Successfully deleted"});
            }
            
        }
    })
})



server.listen(4400, function(){
    console.log('server running at port 4400');
});