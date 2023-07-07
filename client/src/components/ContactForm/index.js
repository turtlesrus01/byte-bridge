import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { Form } from 'react-router-dom';

const ContactForm = () => {
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    const onSubmit = (data) => {
      const { user_name, user_email, subject, message } = data;

      const emailMessage =
        'email — ' + user_email + '<br>' + 'Summary:' + message;

      var emailData = {
        service_id: 'mine_is_gmail',
        template_id: 'template_id',
        user_id: 'user_ID',
        template_params: {
          from_name: user_name,
          to_name: 'Sucheta',
          subject: subject,
          message_html: emailMessage,
        },
      };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(emailData));

      xhr.onload = function () {
        if (xhr.status === 200) {
          alert('Your mail is sent!');
        } else {
          alert('Oops... ' + JSON.stringify(xhr.responseText));
        }
      };

      xhr.onerror = function () {
        alert('Oops... There was an error sending the mail.');
      };
    };

    // Register the submit handler
    Form.addEventListener('submit', handleSubmit(onSubmit));

    // Clean up the event listener
    return () => {
      Form.removeEventListener('submit', handleSubmit(onSubmit));
    };
  }, []);

  return (
    <Form id="contact-form">
      <TextField
        {...register('user_name')}
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('user_email')}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('subject')}
        label="Subject"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('message')}
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
    </Form>
  );
};

export default ContactForm;
