import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaBuildingShield } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

import "../../styles/Login.css";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await authService.login(formData);

      login(data.user, data.token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="login-page">

        <div className="login-card">

          <div className="login-logo">
            <FaBuildingShield />
          </div>

          <h2 className="login-title">
            Visitor Pass
          </h2>

          <p className="login-subtitle">
            Management System
          </p>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

            </Form.Group>

            <Button
              type="submit"
              className="w-100 login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Signing In...
                </>
              ) : (
                "Login"
              )}
            </Button>

          </Form>

          <div className="demo-box">

            <h6>Demo Credentials</h6>

            <p>
              <strong>Email:</strong> admin2@gmail.com
            </p>

            <p>
              <strong>Password:</strong> admin123
            </p>

          </div>

        </div>

      </div>
    </>
  );
};

export default Login;