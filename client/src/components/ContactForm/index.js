import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const form = useRef();
  // Initialize emailjs
  emailjs.init("jBCPSpSdZeJElIxQz");

  const onSubmit = (data) => {
    const { user_name, user_email, subject, message } = data;

    const emailMessage = `email — ${user_email}<br>Summary: ${message}`;

    // const exampleEmailData = {
    //   service_id: "service_icvic7f",
    //   template_id: "template_ocdv2j6", // Replace with your template ID
    //   user_id: "jBCPSpSdZeJElIxQz", // Replace with your Public Key
    //   template_params: {
    //     from_name: user_name,
    //     to_name: "Sucheta",
    //     subject: subject,
    //     message_html: emailMessage,
    //   },
    // };

    emailjs.sendForm(
      // Email service id
      'service_icvic7f',
      // Template id 
      'template_ocdv2j6',
      // Form data 
      form.current,
      // Public key
      'jBCPSpSdZeJElIxQz')
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <form ref={form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("user_name")}
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("user_email")}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("subject")}
        label="Subject"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("message")}
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={formState.isSubmitting}
      >
        Send Email
      </Button>
    </form>
  );
};

export default ContactForm;
