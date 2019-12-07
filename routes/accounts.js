const express = require('express')
const router = express.Router()
const { Pool, Client } = require('pg')
// const client = new Client({
//     user:"postgres",
//     password:"00000000",
//     host:"localhost",
//     port:5432,
//     database:"banka"
// })

// const pool = new Pool({
//     user:"postgres",
//     password:"00000000",
//     host:"localhost",
//     port:5432,
//     database:"banka"
// })

const pool = new Client({
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
    let accounthour = hour
    let accountminute = minute
    let accountday = day
    let accountmonth = month
    let accountsecond = second
    if(hour.toString().length<2){
        accounthour=`0${hour}`
    }
    if(minute.toString().length<2){
        accountminute=`0${minute}`
    }
    if(day.toString().length<2){
        accountday=`0${day}`
    }
    if(month.toString().length<2){
        accountmonth=`0${month}`
    }
    if(second.toString().length<2){
        accountsecond=`0${second}`
    }
    let accountno = `${day}${month}${accounthour}${accountminute}${accountsecond}`
    let accountnumber = parseInt(accountno)
    console.log(accountnumber)
    console.log(req.body)
    const queryy = {
                     text: 'INSERT INTO accounts(accountnumber, createdon, owner, type, status, balance, email, imgurl) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
                     values: [accountnumber, datetime, req.body.firstname + ' ' + req.body.lastname, req.body.type, 'active', req.body.balance,req.body.email,req.body.imgUrl]
                    }
    pool.connect()
     .then(pool.query(queryy)
        .then(result=>{
            res.status(200)
            res.json({success:true,data:req.body})
        })
        .catch(error=>{
            res.status(400)
            res.json({success:false})
            console.log("error1",error)
        
        })) 
     .catch(err=>{
         res.status(400)
         res.json({success:false})
         console.log("error2",error)
     .finally(pool.end())
    })   
    }
)

router.get('/', (req,res)=>{
    pool.connect()
        .then(pool.query('select * from accounts')
            .then(result=>{
                console.log(result.rows)
                res.status(200)
                res.json({success:true, data:result.rows})
            })
            .catch(err=>{
                console.log(err)
            })
        )
        .catch(err=>{
            console.log(err)
            .finally(pool.end())
        })
})

router.get('/:id', (req,res)=>{
    let id = req.params.id
    pool.connect()
        .then(pool.query(`select * from accounts where id = ${id.toString()}`)
            .then(result=>{
                res.status(200)
                res.json({success:true, data:result.rows})
            })
            .catch(err=>{
                console.log(err)
            })
        )
        .catch(err=>{
            console.log(err)
            .finally(pool.end())
        })
})

router.post('/email', (req,res)=>{
    let email = req.body.email
    console.log(req.body)
    pool.connect()
        .then(pool.query(`select * from accounts where email = '${email}'`)
            .then(result=>{
                res.status(200)
                res.json({success:true, data:result.rows})
                console.log("list of accounts",result.rows)
            })
            .catch(err=>{
                console.log(err)
            })
        )
        .catch(err=>{
            console.log(err)
            .finally(pool.end())
        })
})

router.post('/deleteaccount', (req,res)=>{
    let id = req.body.id
    pool.connect()
        .then(pool.query(`delete from accounts where id = ${id.toString()}`)
            .then(result=>{
                res.status(200)
                res.json({success:true, data:result.rows})
            })
            .catch(err=>{
                console.log(err)
            })
        )
        .catch(err=>{
            console.log(err)
            .finally(pool.end())
        })
})

module.exports=router