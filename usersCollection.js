let express=require('express');
let app =express();
app.use(express.json());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, content-Type, Accept"
    );
    next();
});

const port=2411;
app.listen(port, ()=>console.log("Listening on port:", port));//this file will run on port number 2411
const {MongoClient, ObjectId}= require("mongodb"); //The MongoClient allows you to connect to a MongoDB server and perform database 
//operations, while the ObjectId is used for generating unique identifiers for MongoDB documents.
const url='mongodb://localhost:27017';
const dbName='productsDB';// this is the name of database in mongoDB Server
const client=new MongoClient(url);//stabalising connection with the server

app.post('/login', async function(req, res) {
  try {
    const result = await client.connect();
    const db = result.db(dbName);
    const collection = db.collection('users'); //  connecting to with the collection name users
    const {email, password} = req.body; // data coming from client side 
    console.log(email, password);
    if(password && email){
        const user = await collection.findOne({email, password});  // finding One the user 
        if (user) {
      // User exists, valid email and password
          res.status(200).send({ message:'1' });
        } else {
          const user1 = await collection.findOne({email});
          if(user1){
            res.status(202).send({message:'5'});
          }
          else {
            // User exist, password is wrong
            let response= await collection.insertOne(req.body);
            res.status(201).send({ message: '2' });
        }
          }

    }
    else if(email && !password){
      const user=await collection.findOne({email});
      if(user){
        //user exist, ask for password
        res.status(200).send({message:'3'});
      } else {
        //user dosn't exist, ask to create a new account
        res.status(201).send({message:'4'});
      }
    }
  } catch (error) {
    console.error(error);
    //else if there is any problem with the mongoDB server
    res.status(500).send({ message: '5' });
  }
});