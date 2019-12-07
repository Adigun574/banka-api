const express = require ('express')
const users = require ('./routes/users')
const accounts = require('./routes/accounts')
const transactions = require('./routes/transactions')
const bodyParser = require('body-parser')
const cors = require('cors')

const { Pool, Client } = require('pg')

//local pg connection
// const client = new Client({
//     user:"postgres",
//     password:"00000000",
//     host:"localhost",
//     port:5432,
//     database:"banka"
// })

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})


//execute()

async function execute(){
    try {
        await client.connect()
        console.log("connected succesfully")
        try {
            const results = await client.query('select * from users')
            //console.log(results.rows)
        }
        catch(e){
            console.log("query error")
        }
      } catch(err) {
        console.log("connection error");
      }
      finally{
          await client.end()
          console.log("client disconnected (index.js)")
      }
}

const app = express()
const port = process.env.PORT || 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()   
// });


app.get("/",(req,res)=>{
    res.send('welcome to heaven y\'all bunch of mofos')
})


app.use('/users',users)

app.use('/accounts',accounts)

app.use('/transactions',transactions)

// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
// });

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

//"nodemon --exec babel-node index.js"


