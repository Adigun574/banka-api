const express = require('express')
const router = express.Router()
const { Pool, Client } = require('pg')
const nodemailer = require('nodemailer')
const email = require('./email')
// const pool = new Pool({
//     user:"postgres",
//     password:"00000000",
//     host:"localhost",
//     port:5432,
//     database:"banka"
// })

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
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
    // pool.connect()
    //  .then(
    pool.query(queryy)
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
        )
    // )
    //  .catch(err=>{
    //      console.log(err)
    //      pool.end()
    //  })
    
    }
)

router.post('/deactivate',(req,res)=>{
    //console.log(req.body)
    // pool.connect()
    //  .then(
    pool.query('UPDATE accounts SET status = $1 WHERE id = $2',
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
        )
    // )
    //  .catch(err=>{
    //      console.log(err)
    //      pool.end()
    //  })
})

router.get('/viewtransaction/:id',(req,res)=>{
    let id = req.params.id
    // pool.connect()
    //  .then(
    pool.query(`select * from transactions where accountid = ${id.toString()}`)
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
        )
    // )
    //  .catch(err=>{
    //      console.log(err)
    //      pool.end()
    //  })
})

module.exports=router
