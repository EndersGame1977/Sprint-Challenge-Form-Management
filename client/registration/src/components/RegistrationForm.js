import React from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegistrationForm() {
  return (
    <div>
      <Form>
        <div>
          <ErrorMessage name="username" />
          <Field type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <ErrorMessage name="password" />
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
}

const FormikRegistrationForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.username === "alreadytaken") {
      setErrors({ username: "That username is already taken" });
    } else {
      axios
        .post("http://localhost:5000/api/register", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
          window.alert("Form submitted " + res.data.message);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
  }
})(RegistrationForm);

export default FormikRegistrationForm;
