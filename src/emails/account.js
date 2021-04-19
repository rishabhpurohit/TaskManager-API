const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SENDGRID_API_KEY);




const sendWelcomeEmail =(email,name) =>{
    sgMail.send({
        to:email,
        from:'demonscaptureme77@gmail.com',
        subject:'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        //html:'',
    })
}
const cancelREG = (email,name)=> {
    sgMail.send({
        to:email,
        from:'demonscaptureme77@gmail.com',
        subject:`Goodbye ${name}!`,
        text: `We're sad to see you go ${name}. Let me know how we could have improved our services. Hoping to see you again soon!`,
        //html:'',
    })
}


module.exports = {
    sendWelcomeEmail,
    cancelREG,
}

// const msg = {
//     to:  'demonscaptureme77@gmail.com',
//     from:'demonscaptureme77@gmail.com',
//     subject:'reached?',
//     text:'aur bhai sab khaeriyat? CHECK THIS OUT - https://youtu.be/dQw4w9WgXcQ'
// }

// sgMail.send(msg).then(() => {
//     console.log('Email sent')
// }).catch((error) => {
//     console.error(error)
// })