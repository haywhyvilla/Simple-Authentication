"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import RingLoader from "react-spinners/RingLoader";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Check if the user is already logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus) {
      setIsLoggedIn(true);
      router.replace("/profile");
    }
  }, []);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login authentication here (e.g., with an API or hard-coded check)

    // For this example, let's assume the login is successful when username and password are both "admin"
    if (email === "admin@gmail.com" && password === "admin") {
      // Store login information in local storage
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to Profile page
      router.push("/profile");
    } else {
      alert("Invalid username or password");
    }
    reset();
  };

  return (
    <div className={styles.signinpage}>
      <div className={styles.signinheader}>
        <Link href="/">
          <h2>Login Page</h2>
        </Link>
        <h2 className={styles.mobilehide}>Login</h2>
      </div>

      <div className={styles.signinbodycontainer}>
        {loading ? (
          <RingLoader
            color={"#1f2937"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className={styles.itemform}>
            <h1>Click the button below to Login</h1>

            {isLoggedIn ? (
              <p>
                You are already logged in. Go to your
                <a href="/profile">Profile</a>.
              </p>
            ) : (
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.forminput}
                  />
                </div>
                <p className={styles.error}>{errors.email?.message}</p>
                <div>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.forminput}
                  />
                </div>
                <p className={styles.error}>{errors.password?.message}</p>
                <button type="submit" className={styles.formbutton}>
                  Log In
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
