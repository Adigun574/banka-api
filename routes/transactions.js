const express = require('express')
const router = express.Router()
const { Pool, Client } = require('pg')
const nodemailer = require('nodemailer');
//const sendmail = require('sendmail')();
const email = require('./email')
const pool = new Pool({
    user:"postgres",
    password:"00000000",
    host:"localhost",
    port:5432,
    database:"banka"
})


const app = express()




router.post('/add',(req,res)=>{
    let d = new Date()
    let day = d.getDate()
    let month = d.getMonth() + 1
    let year = d.getFullYear()
    let hour = d.getHours()
    let minute = d.getMinutes()
    let second = d.getSeconds()
    let datetime = `${day}/${month}/${year}-${hour}:${minute}:${second}`
    const queryy = {
                     text: 'INSERT INTO transactions(type, accountnumber, cashier, amount, oldbalance, newbalance, sender, accountid, datetime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                     values: [req.body.type, req.body.accountnumber, req.body.cashier, req.body.amount, req.body.oldbalance, req.body.newbalance, req.body.sender, req.body.accountid, datetime]
                    }
    pool.connect()
     .then(pool.query(queryy)
        .then(result=>{
            res.status(200)
            res.json({success:true,data:req.body})
            pool.query(
                'UPDATE accounts SET balance = $1 WHERE id = $2',
                [req.body.newbalance, req.body.accountid])
                //just added stuffs
            .then(pool.query(    
                `select * from accounts where accountnumber = ${req.body.accountnumber}`
            )
                .then(result=>{
                    console.log("f**cking email",result.rows[0].email)
                    let transactionemail = result.rows[0].email
                    email(transactionemail,"transaction alert",`A ${req.body.type} transaction of N${req.body.amount} just occured in your account ${req.body.accountnumber}; sender:${req.body.sender||''}`)
                })
                .catch(err=>{
                    console.log(err)
                })
            )
            .catch(err=>{
                console.log(err)
            })

        //
        })
        

        .catch(
            err=>{
                res.status(400)
                res.json({success:false})
                pool.end()
            }
        ))
     .catch(err=>{
         console.log(err)
         pool.end()
     })
    
    }
)

router.post('/deactivate',(req,res)=>{
    console.log(req.body)
    pool.connect()
     .then(pool.query('UPDATE accounts SET status = $1 WHERE id = $2',
            [req.body.status, req.body.accountid])
        .then(result=>{
            res.status(200)
            res.json({success:true,data:req.body})
        })
        .catch(
            err=>{
                res.status(400)
                res.json({success:false})
                pool.end()
            }
        ))
     .catch(err=>{
         console.log(err)
         pool.end()
     })
})

router.get('/viewtransaction/:id',(req,res)=>{
    let id = req.params.id
    pool.connect()
     .then(pool.query(`select * from transactions where accountid = ${id.toString()}`)
        .then(result=>{
            res.status(200)
            res.json({success:true,data:result.rows})
            //console.log(result.rows)
        })
        .catch(
            err=>{
                res.status(400)
                res.json({success:false})
                console.log(err)
                pool.end()
            }
        ))
     .catch(err=>{
         console.log(err)
         pool.end()
     })
})

module.exports=router

// execute()

//     async function execute(){
//         try {
//             await client.connect()
//             console.log("connected succesfully (post transaction)")
//             try {
//                 const queryy = {
//                         text: 'INSERT INTO transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7)',
//                         values: [req.body.createdon, req.body.type, req.body.accountnumber, req.body.cashier, req.body.amount, req.body.oldbalance, req.body.newbalance]
//                     }
//                 const results = await client.query(queryy)
//                 res.json({status:200,data:{success:true}})
//             }
//             catch(e){
//                 res.json({status:404,success:false})
//             }
//         } catch(err) {
//             res.status({status:404,success:false})
//         }
//         finally{
//             await client.end()
//         }
//     }

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass // generated ethereal password
//         }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: 'adigunibrahim574@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
