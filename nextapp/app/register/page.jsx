"use client";

import "@styles/Register.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = () => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === profileImage ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();
      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("/api/register/", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Registration failed", err.message);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const router = useRouter();

  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  });

  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="usename"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatched && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile" />
            <p>Upload Profile Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile"
              style={{ maxWidth: "80px", maxHeight: "100px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Login in with Google</p>
          <FcGoogle />
        </button>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default Register;
