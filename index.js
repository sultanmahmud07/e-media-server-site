const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()

//middleware>>>>>>
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.wtcs29q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const allMediaCollection = client.db('eMediaZone').collection('allMedia')
    const allUsersCollection = client.db('eMediaZone').collection('users')

    // app.get('/allMedia', async(req, res) => {
    //   const query = {};
    //   const media = await allMediaCollection.find(query).toArray();
    //   res.send(media);
    // })
    app.get('/allMedia', async(req, res) => {
      const query = {};
      const cursor = allMediaCollection.find(query);
      const media = await cursor.toArray();
      res.send(media);
    })


    app.get('/allMedia/:id', async(req, res) => {
      const id =req.params.id;
      const query = { _id: ObjectId(id)};
      const service = await allMediaCollection.findOne(query);
      res.send(service);
    })

    // app.get('/allMedia/:id', async(req, res) => {
    //   const id =req.params.id;
    //   const query = { _id: ObjectId(id)};
    //   const media = await allMediaCollection.findOne(query);
    //   res.send(media);
    // });
    app.post('/allMedia', async(req, res) => {
      const product = req.body;
      const result = await allMediaCollection.insertOne(product);
      res.send(result);
    })


        //All user Collection code here>>>>
        app.post('/users', async(req, res) => {
          const user = req.body;
          const result = await allUsersCollection.insertOne(user);
          res.send(result);
        })


        app.get('/users/:email', async (req, res) => {
          const email = req.params.email;
          const query = { email }
          const user = await allUsersCollection.findOne(query);
          res.send(user);
        })
        // app.get('/allMedia/:email', async (req, res) => {
        //   const email = req.params.active;
        //   const query = { email }
        //   const user = await allMediaCollection.findOne(query);
        //   res.send(user);
        // })





  }
  finally{

  }

}
run().catch(console.log);





app.get('/', (req, res) => {
  res.send('E-Media.com server is running!')
})

app.listen(port, () => {
  console.log(`E-Media.com server is running on port ${port}`)
})