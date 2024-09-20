const nodemailer = require('nodemailer')

module.exports = {
    async afterCreate(event) {   
        const { result } = event;
        try {
            const html = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Result Email</title>
                    </head>
                    <body>
                        <h1>Strapi afterCreate LifeCycle Details</h1>
                        <ul>
                            <li><strong>ID:</strong> ${result.info.id}</li>
                            <li><strong>Title:</strong> ${result.info.title}</li>
                            <li><strong>Description:</strong> ${result.info.desc}</li>
                            <li><strong>Is Done:</strong> ${result.info.is_done}</li>
                        </ul>
                    </body>
                    </html>`
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, 
                auth: {
                  user: "lminh9594@gmail.com",
                  pass: "itxkgruinrigfgeq",
                },
            });

            const info = await transporter.sendMail({
                from: '"test strapi" <lminh9594@gmail.com>', 
                to: "lminh9594@gmail.com", 
                subject: "strapi lifecycle", 
                text: "strapi lifecycle", 
                html: html, 
            });

            console.log("Message sent: " + info.messageId)
            console.log("RESULT: ", result.info)
        }catch(e) {
            console.log(e)
        }
        
    }
}