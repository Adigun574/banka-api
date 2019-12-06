const express = require ('express')
const users = require ('./routes/users')
const accounts = require('./routes/accounts')
const transactions = require('./routes/transactions')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
//const stuffs = require('./routes/stuffs')
const email = require('./routes/email')
//const smtpTransport = require('nodemailer-smtp-transport');

const { Pool, Client } = require('pg')

const client = new Client({
    user:"postgres",
    password:"00000000",
    host:"localhost",
    port:5432,
    database:"banka"
})

//email('adigunibrahim574@gmail.com', 'new password', '1001')
//console.log(stuffs)
//


// const transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//       user: 'techadigun@gmail.com',
//       pass: stuffs
//     }
//   }));

// let receiver = 'adigunibrahim574@gmail.com'
// let subject = 'still testting'
// let text = 'Hello from nodejs'

// let sendAnEmail = (receiver, subject, text)=>{

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'techadigun@gmail.com',
//       pass: stuffs
//     }
//   });
    
//     const mailOptions = {
//       from: 'techadigun@gmail.com',
//       to: receiver,
//       subject: subject,
//       text: text
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
  

// }

// sendAnEmail(receiver,subject,text)



execute()

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
    // await client.connect()
    // console.log("connected succesfully")
    // const results = await client.query('select * from users')
    // console.log(results.rows)
    // await client.end()
    // console.log("client disconnected")
}


const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send('welcome to heaven y\'all bunch of mofos')
})


app.use('/users',users)

app.use('/accounts',accounts)

app.use('/transactions',transactions)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})

//"nodemon --exec babel-node index.js"
//

//C:\Users\Adigun\AppData\Roaming\npm;C:\Program Files\heroku\bin


// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'banka',
//     password: 'adigun96',
//     port: 5432,
//   })
//   //pool.query('SELECT NOW()', (err, res) => {
//     pool.query('SELECT * FROM users',(err, res)=>{
//     console.log(err, res.rows)
//     pool.end()
//   })
  
//   client.connect()
//   //client.query('SELECT NOW()', (err, res) => {
//   client.query('SELECT * FROM users',(err, res)=>{  
//     console.log(err, res.rows)
//     client.end()
//   })

// client.connect()
// .then(()=>console.log("connected succesfully"))
// .then(()=>client.query('select * from users'))
// .then(results=>console.log(results.rows))
// //client.end()})
// .catch((e)=>{console.log("this is the error",e)
// client.end()})
// //.finally(client.end())


// client.connect((err,res)=>{
//     if(err){
//         console.log(err)
//         client.end()
//     }
//     else if (res){
//         console.log(res)
//         client.query('select * from users',(err1,res1)=>{
//             if(err1){
//                 console.log("error1:",err1)
//             }
//             else if(res1){
//                 console.log(res1)
//             }
//         })
//         client.end()
//     }
// })


// async function execute(){
//     await client.connect()
//     console.log("connected succesfully")
//     const results = await client.query('select * from users')
//     console.log(results.rows)
//     await client.end()
//     console.log("client disconnected")
// }


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'techadigun@gmail.com',
//     pass: stuffs
//   }
// });
  
//   const mailOptions = {
//     from: 'techadigun@gmail.com',
//     to: 'adigunibrahim574@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });