const nodemailer = require('nodemailer')

let receiver = 'adigunibrahim574@gmail.com'
let subject = 'still testting'
let text = 'Hello from nodejs'

let sendAnEmail = (receiver, subject, text)=>{

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'techadigun@gmail.com',
      pass: 'adedotun96'
    }
  });
    
    const mailOptions = {
      //from: 'techadigun@gmail.com',
      from: '"Banka" <techadigun@gmail.com>',
      to: receiver,
      subject: subject,
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  

}

//sendAnEmail(receiver,subject,text)

module.exports=sendAnEmail