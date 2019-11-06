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

const pool = new Pool({
    user:"postgres",
    password:"00000000",
    host:"localhost",
    port:5432,
    database:"banka"
})


app = express()
router.get("/",(req,res)=>{
    res.send("get users")
})

router.post("/add",(req,res)=>{
    const queryy = {
                        text: 'INSERT INTO users(email, firstname, lastname, password, isadmin, imgurl) VALUES($1, $2, $3, $4, $5, $6)',
                        values: [req.body.email, req.body.firstName, req.body.lastName, req.body.password, true, req.body.imgUrl]
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
    pool.connect()
     .then(()=> {
         pool.query('select * from users where email = $1', [credentials.email])
          .then((result)=>{
              console.log("f**king result:",result.rows)
                if(result.rows.length!=0){
                    if(result.rows[0].password==credentials.password){
                        res.status(200)
                        res.json({success:true,data:result.rows[0]})
                    }
                    else{
                        res.status(400)
                        res.json({success:false})
                    }
                }
                else{
                    res.status(404)
                    res.json({success:false,msg:"user not found"})
                }
            })
          .catch(err=>{
              console.log(err)
                pool.end()})
        })
     .catch((err)=>{
         console.log(err)
            pool.end()})

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

    //  .then(pool.query('UPDATE users SET password = $1 WHERE email = $2',
    //                     [newpassword, req.body.email])
    //     .then(result=>{
    //         res.status(200)
    //         res.json({success:true,password:newpassword})
    //         //pool.end()
    //     })
    //     .catch(err=>{
    //         console.log("this is error1:",err)
    //         res.status(400)
    //         res.json({success:false})
    //         console.log("prob1")
    //         pool.end()
    //     }))
    //  .catch(err=>{
    //      console.log("this is error2:",err)
    //      res.status(400)
    //      res.json({success:false})
    //      console.log("prob2")
    //      pool.end()
    //     })
     
})



//.finally(console.log("finally"))

//     execute()

// async function execute(){
//     try {
//         await client.connect()
//         console.log("connected succesfully (post user)")
//         try {
//             const queryy = {
//                 text: 'INSERT INTO users(email, firstname, lastname, password, isadmin) VALUES($1, $2, $3, $4, $5)',
//                 values: [req.body.email, req.body.firstName, req.body.lastName, req.body.password, true]
//               }
//             const results = await client.query(queryy)
//         }
//         catch(e){
//             console.log("query error (post user)",e)
//         }
//       } catch(err) {
//         console.log("connection error (post user)",err)
//       }
//       finally{
//         await client.end()
//         console.log("client disconnected (post user)")
//         callback()
//       }
// }
   //client.end() 

// User.addstaff(req,(err,user, eee)=>{
    //     if(err){
    //         console.log("user not created")
    //         res.json({success:false})
    //     }
    //     else if(user){
    //         console.log("user created")
    //         res.json({success:true})
    //     }
    //     else if(eee){
    //         console.log("i dont know")
    //     }
    //     else{
    //         console.log("shit")
    //     }
    // })

module.exports = router


// client.connect()
// .then(()=>console.log("connected succesfully"))
// .then(()=>client.query('select * from users'))
// .then(results=>console.log(results.rows))
// //client.end()})
// .catch((e)=>{console.log("this is the error",e)
// client.end()})
// //.finally(client.end())

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
