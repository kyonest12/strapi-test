module.exports = ({}) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: "lminh9594@gmail.com",
            pass: "itxkgruinrigfgeq",
          },
        },
        settings: {
          defaultFrom: 'noreply@example.com',
          defaultReplyTo: 'noreply@example.com',
        },
      },
    },
  });