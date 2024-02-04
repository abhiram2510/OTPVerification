const fast2sms = require('fast-two-sms')

var options = {
    authorization:"ys8753syUjp97Q8ThuonFZmTo9qvZpzznw1KWPHkoRWxkU7sWFrkx4A7Aqcb", 
    message:'This is test OTP from Abhiram',
    numbers:['9108023445']
};

fast2sms.sendMessage(options)
    .then((response)=>{
        console.log(response)
    })
    .catch((error) =>{
        console.log(error)
})
