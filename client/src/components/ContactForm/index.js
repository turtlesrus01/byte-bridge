// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button, TextField } from "@mui/material";
// import emailjs from "emailjs-com";

// const ContactForm = () => {
//   const { register, handleSubmit, formState } = useForm();
//   // Initialize emailjs
//   emailjs.init("jBCPSpSdZeJElIxQz");

//   const onSubmit = (data) => {
//     const { user_name, user_email, subject, message } = data;

//     const emailMessage = `email — ${user_email}<br>Summary: ${message}`;

//     const emailData = {
//       service_id: "service_icvic7f",
//       template_id: "template_ocdv2j6", // Replace with your template ID
//       user_id: "jBCPSpSdZeJElIxQz", // Replace with your Public Key
//       template_params: {
//         from_name: user_name,
//         to_name: "Sucheta",
//         subject: subject,
//         message_html: emailMessage,
//       },
//     };

//     emailjs
//       .send(emailData)
//       .then(
//         function (response) {
//           console.log("SUCCESS!", response.status, response.text);
//           alert("Your mail is sent!");
//         },
//         function (error) {
//           console.log("FAILED...", error);
//           alert("Oops... There was an error sending the mail.");
//         }
//       );
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <TextField
//         {...register("user_name")}
//         label="Name"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         {...register("user_email")}
//         label="Email"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         {...register("subject")}
//         label="Subject"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         {...register("message")}
//         label="Message"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         multiline
//         rows={4}
//       />
//       <Button
//         type="submit"
//         variant="contained"
//         disabled={formState.isSubmitting}
//       >
//         Send Email
//       </Button>
//     </form>
//   );
// };

// export default ContactForm;
