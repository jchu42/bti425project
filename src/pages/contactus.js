import { useForm, Controller } from 'react-hook-form';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

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
  }

  return (
    <div className={styles.container}>
      <Head>
          <title>Contact Us</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit(submitForm)}>
        Name: <br />
        <input type="text" placeholder="Name" {...register("name", {required: true, maxLength: 20})} />
        {errors.name?.type === "required" && <span className="inputErrorText"><br />Name is required</span>}
        {errors.name?.type === "maxLength" && <span className="inputErrorText"><br />Name Cannot contain more than 20 characters</span>}<br /><br />

        Email: <br />
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.name?.type === "required" && <span className="inputErrorText"><br />Email is required</span>}
        {errors.email?.type === "pattern" && <span className="inputErrorText"><br />Invalid Email</span>}<br /><br />

        PhoneNumber: <br />
        <input type="tel" placeholder="Phone Number" {...register("phoneno")} />
        {errors.phoneno?.type === "validate" && <span className="inputErrorText"><br />Invalid Phone Number</span>}<br /><br />

        Questions and Suggestions: <br />
        <textarea {...register("qands", {required: true, maxLength: 5})} />
        {errors.qands?.type === "required" && <span className="inputErrorText"><br />This field is required</span>}<br /><br />

        {/* <button size="xxl" type="submit" disabled={Object.keys(errors).length > 0}>Update User</button> */}
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}
