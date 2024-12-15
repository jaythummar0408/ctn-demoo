import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const initialValues: User = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    mobile: "",
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/account");
    }
  }, [navigate]);
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("please enter valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .test(
        "passwords-match",
        "Confirm password not match with password.",
        function (value) {
          const { password } = this.parent;
          return value === password;
        }
      ),
    dob: Yup.string().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  const handleSubmit = (values: User) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((i) => i.email == values?.email)) {
      toast.error("User already register.");
    } else {
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User registration successfully.");
      navigate("/");
    }
  };

  return (
    <div className="row justify-content-center m-0 allign-items-center">
      <div className="col-md-4">
        <div className="card p-4">
          <h2 className="text-center text-success fw-bold">Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="form-group mb-3">
                  <label className="text-white">Username</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-white">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-3 PasswordFill">
                  <label className="text-white">Password</label>
                  <Field
                    name="password"
                    type={`${isShowPassword ? "text" : "password"}`}
                    className="form-control"
                  />
                  <span
                    className="cursor-pointe"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <i className="fa-regular fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-3 PasswordFill">
                  <label className="text-white">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type={`${isShowConfirmPassword ? "text" : "password"}`}
                    className="form-control"
                  />
                  <span
                    className="cursor-pointe"
                    onClick={() =>
                      setIsShowConfirmPassword(!isShowConfirmPassword)
                    }
                  >
                    {isShowConfirmPassword ? (
                      <i className="fa-regular fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </span>

                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="text-white">Date of Birth</label>
                  <Field name="dob" type="date" className="form-control" />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="text-white">Mobile Number</label>
                  <Field name="mobile" type="text" className="form-control" />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="text-white">Gender</label>
                  <div className="d-flex">
                    <label className="text-white pe-4">
                      <Field
                        type="radio"
                        name="gender"
                        value="Male"
                        className="me-1"
                      />
                      Male
                    </label>
                    <label className="text-white pe-4">
                      <Field
                        type="radio"
                        name="gender"
                        value="Female"
                        className="me-1"
                      />
                      Female
                    </label>
                    <label className="text-white">
                      <Field
                        type="radio"
                        name="gender"
                        value="Other"
                        className="me-1"
                      />
                      Other
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-white text-center mt-3">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-success"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
