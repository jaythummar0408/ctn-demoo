import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const initialValues = { email: "", password: "" };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/account");
    }
  }, [navigate]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (item) => item.email === values.email && item.password === values.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(
        user.email === "admin@gmail.com"
          ? "Admin Login Successful"
          : "Login Successful"
      );
      navigate("/account");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="row justify-content-center align-items-center vh-100 m-0">
      <div className="col-md-4">
        <div className="card p-4">
          <div className="text-white">
            <div className="alert alert-info alert-dismissible" role="alert">
              <h5 className="text-success">Quick Access</h5>
              <p>Use the following credentials:</p>
              <h6>Admin Account:</h6>
              <h6>
                {" "}
                Email: <span className="text-success">admin@gmail.com</span>
              </h6>
              <h6>
                {" "}
                Password: <span className="text-success">admin@123</span>
              </h6>
              <p>
                Admin can edit or delete user accounts.{" "}
                <h6 className="mt-2">Demo Account:</h6>
                <h6>
                  {" "}
                  Email:{" "}
                  <span className="text-success">janedoe@example.com</span>
                </h6>
                <h6>
                  {" "}
                  Password: <span className="text-success">password123</span>
                </h6>
              </p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

            </div>
          </div>
          <h2 className="text-center text-success fw-bold">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="form-group mb-3">
                  <label className="text-white" htmlFor="email">
                    Email
                  </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3 PasswordFill">
                  <label className="text-white" htmlFor="password">
                    Password
                  </label>
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
                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-white text-center mt-3">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-success"
              onClick={() => navigate("/register")}
            >
              {" "}
              Signup New Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
