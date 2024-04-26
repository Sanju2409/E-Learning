const nodemailer=require("nodemailer")

module.exports=async(email,subject,text)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            service:"gmail",
            port:587,
            secure:true,
            auth:{
                user:"sanjanashetty.2409@gmail.com",
                pass:"fgiu abnu zzik sylo"
            }
        });
        await transporter.sendMail({
            from:"sanjanashetty.2409@gmail.com",
            to:email,
            subject:subject,
            text:text
        });
        console.log("Email sent successfully")
    }
    catch(error){
            console.log("Email not sent");
            console.log(error);
    }
}