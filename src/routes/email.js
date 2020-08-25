const nodemailer = require("nodemailer");

class Email {
    constructor(oConfig){
        this.createTranspot = nodemailer.createTransport(oConfig)
    }

    enviarCorreo(oEmail){
        try {
            this.createTranspot.sendMail(oEmail, (err, inf) => {
                if(err){
                    console.log(err)
                }else{
                    console.log('eviado')
                }
                this.createTranspot.close();
            });
        } catch (error) {
            console.log(erros)
        }
    }
}

module.exports = Email;