const sendSms = (mobile,otp,msg)=>{

         let authKey=process.env.AUTHKEY
         let sender=process.env.SENDER
 
    let sms = request.post(`http://api.msg91.com/api/sendotp.php?authkey=${authKey}&mobile=91${mobile}&message=${msg}&sender=${sender}&otp=${otp}`)
     
     return sms;
        
}