import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Container, Form, Button } from 'react-bootstrap';

export default function ContactUs() {

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm({
    defaultValues: {
        name: "",
        phoneno: "",
        email: "",
        qands: ""
    }
  });

  function submitForm(data) {
    // dummy function
    console.log(data);
    // save data to database?
  }

  return (
    <Container>
      <Head>
          <title>Contact Us</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} />
          {errors.name?.type === "required" && <span className={styles.error}>Name is required</span>}
          {errors.name?.type === "maxLength" && <span className={styles.error}>Name Cannot contain more than 20 characters</span>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email?.type === "required" && <span className={styles.error}>Email is required</span>}
          {errors.email?.type === "pattern" && <span className={styles.error}>Invalid Email</span>}
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="tel" placeholder="Phone Number" {...register("phoneno")} />
          {errors.phoneno?.type === "validate" && <span className={styles.error}>Invalid Phone Number</span>}
        </Form.Group>

        <Form.Group controlId="formQandS">
          <Form.Label>Questions and Suggestions:</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("qands", { required: true, maxLength: 500 })} />
          {errors.qands?.type === "required" && <span className={styles.error}>This field is required</span>}
        </Form.Group>

        <Button variant="danger" type="submit" style={{ margin: '20px 5px' }}>
          Submit
        </Button>
      </Form>

    </Container>
  );
}
