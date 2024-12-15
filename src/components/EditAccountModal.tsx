import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EditAccountModalProps } from "../types";
import moment from "moment";

const EditAccountModal = ({
  user,
  showModal,
  onClose,
  onSave,
}: EditAccountModalProps) => {
  if (!showModal || !user) return null;

  const capitalizeGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };
  
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Account</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                dob: moment(user.dob).format("YYYY-MM-DD"),
                gender: capitalizeGender(user.gender),
              }}
              validationSchema={Yup.object({
                username: Yup.string().required("Username is required"),
                email: Yup.string()
                  .email("Invalid email format")
                  .required("Email is required"),
                mobile: Yup.string()
                  .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
                  .required("Mobile number is required"),
                dob: Yup.string().required("Date of Birth is required"),
                gender: Yup.string().required("Gender is required"),
              })}
              onSubmit={(values) => {
                onSave(values);
              }}
            >
              {() => (
                <Form>
                  <div className="form-group mb-3">
                    <label>Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      disabled
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Mobile</label>
                    <Field
                      name="mobile"
                      type="number"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Date of Birth</label>
                    <Field name="dob" type="date" className="form-control" />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Gender</label>
                    <Field name="gender" as="select" className="form-select">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Save Changes
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;
