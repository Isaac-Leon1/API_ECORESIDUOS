import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configuración de nodemailer (transporter)
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
});

// Función para enviar correo al usuario
const sendMailToAdmin = (userMail, token) => {
  // Configuración del correo
  let mailOptions = {
    from: process.env.USER_MAILTRAP, // Dirección del remitente
    to: userMail, // Lista de destinatarios
    subject: "Verifica tu cuenta", // Línea de asunto
    html: `
    <h1>Verifica tu cuenta</h1>
    <hr>
    <p>Hola, haz clic <a href="${process.env.URL_BACKEND}confirmar/${encodeURIComponent(token)}">aquí</a> para confirmar tu cuenta.</p>
    <hr>
    <footer>Residuos</footer>
    `, // Cuerpo del correo
  };

  transporter.sendMail(mailOptions, function (error, info) {
    // Enviar el correo
    if (error) {
      console.log(error); // Si hay un error, imprimirlo en consola
    } else {
      console.log("Correo enviado: " + info.response); // Si se envía correctamente, imprimirlo en consola
    }
  });
};

// Funcion para enviar correo de recuperación de contraseña
const sendMailToRecoveryPassword = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Sistema de gestion de residuos</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Residuos</footer>
    `,
    });
    console.log("Mensaje enviado satisfactoriamente: %s", info.messageId);
}

// Funcion para enviar un correo al ciudadano
const sendMailToPerson = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Correo de verificacion de cuenta para Ciudadanos",
    html: `
    <h1>Sistema de gestion de residuos</h1>
    <hr>
    Click <a href=${process.env.URL_BACKEND}ciudadano/verify/${token}>aqui</a> para confirmar tu cuenta.
    <hr>
    <footer>Residuos</footer>
    `,
  });
  console.log("Mensaje enviado satisfactoriamente: %s", info.messageId);
}

export { sendMailToAdmin, sendMailToRecoveryPassword, sendMailToPerson };