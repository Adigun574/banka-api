const { Pool, Client } = require('pg')

const client = new Client({
    user:"postgres",
    password:"00000000",
    host:"localhost",
    port:5432,
    database:"banka"
})



module.exports.addstaff = (req,callback)=>{
//         execute()

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
        
}



//console.log(req.body)
    // const queryy = {
    //     text: 'INSERT INTO users(email, firstname, lastname, password, isadmin) VALUES($1, $2, $3, $4, $5)',
    //     values: [req.body.email, req.body.firstName, req.body.lastName, req.body.password, true]
    //   }
    // client.query(queryy,callback())
    //to test
    //   client.query(queryy, (err1,res1)=>{
    //       if(err1){
    //           res.json({status:false})
    //       }
    //       else if (res1){
    //           res.json({status:true})
    //       }
    //   })
    //to test
    //console.log(result)
