const express = require('express')
const router = express.Router()
const User = require ('../models/user')

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

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

// const pool = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
// })


const app = express()
router.get("/",(req,res)=>{
    res.send("get users")
})

router.post("/add",(req,res)=>{
    const queryy = {
                        text: 'INSERT INTO users(email, firstname, lastname, password, isadmin, imgurl) VALUES($1, $2, $3, $4, $5, $6)',
                        values: [req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.isAdmin, req.body.imgUrl]
                    }
    pool.connect()
     .then(pool.query(queryy)
        .then(result=>{
            res.status(200)
            res.json({success:true,data:req.body})
            //pool.end()
        })
        .catch(err=>{
            console.log("this is error1:",err)
            res.status(400)
            res.json({success:false})
            console.log("prob1")
            pool.end()
        }))
     .catch(err=>{
         console.log("this is error2:",err)
         res.status(400)
         res.json({success:false})
         console.log("prob2")
         pool.end()
        })
     
})

router.post("/login",(req,res)=>{
    let credentials = {
        email:req.body.email,
        password:req.body.password,
        id:2,
    }
    //res.send('authenticate user')
    pool.connect()
     .then(()=> {
         pool.query('select * from users where email = $1', [credentials.email])
          .then((result)=>{
              console.log("f**king result:",result.rows)
                if(result.rows.length!=0){
                    if(result.rows[0].password==credentials.password){
                        res.status(200)
                        res.json({success:true,data:result.rows[0]})
                        //pool.end()
                    }
                    else{
                        res.status(400)
                        res.json({success:false})
                        //pool.end()
                    }
                }
                else{
                    res.status(404)
                    res.json({success:false,msg:"user not found"})
                    //pool.end()
                }
                //pool.end()
            })
          .catch(err=>{
              console.log(err)
                pool.end()
            })
        })
     .catch((err)=>{
         console.log(err)
            pool.end()
        })

})

router.post("/resetpassword",(req,res)=>{
    newpassword = parseInt(Math.random()*10000)
    console.log(newpassword)
    pool.connect()
    //checking if email is valid starts
    pool.query('select * from users where email = $1', [req.body.email])
    .then((result)=>{
        console.log("f**king result:",result.rows)
          if(result.rows.length!=0){
               (pool.query('UPDATE users SET password = $1 WHERE email = $2',
                        [newpassword, req.body.email])
                .then(result=>{
                    res.status(200)
                    res.json({success:true,password:newpassword})
                    //pool.end()
                })
                .catch(err=>{
                    console.log("this is error1:",err)
                    res.status(400)
                    res.json({success:false})
                    console.log("prob1")
                    pool.end()
                }))
          }
          else{
              res.status(404)
              res.json({success:false,msg:"user not found"})
          }
      })
    .catch(err=>{
        console.log(err)
          pool.end()})
    //checking if email is valid ends
     
})




module.exports = router

