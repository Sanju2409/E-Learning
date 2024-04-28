const nodemailer=require("nodemailer")

module.exports=async(email,subject,text)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            service:"gmail",
            port:587,
            secure:true,
            auth:{
                user:"keerthanaa1002@gmail.com",
                pass:"figl ukrb ghrj pjbn"
            }
        });
        await transporter.sendMail({
            from:"keerthanaa1002@gmail.com",
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