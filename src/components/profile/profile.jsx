"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";

import RingLoader from "react-spinners/RingLoader";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Check if the user is logged in; if not, redirect to the Login page
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (!loggedInStatus) {
      router.replace("/");
    }
  }, []);

  const handleLogout = () => {
    // Clear login information from local storage
    localStorage.removeItem("isLoggedIn");

    // Redirect to Login page
    router.push("/");
  };

  return (
    <div className={styles.profilepage}>
      <div className={styles.signinheader}>
        <Link href="/profile">
          <h2>Profile Page</h2>
        </Link>

        <h2 className={styles.mobilehide}>My Profile</h2>
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
            <h1>You are logged In</h1>
            <p>Welcome to your profile!</p>
            <p>Click the button below to logout</p>
            <button onClick={handleLogout} className={styles.formbutton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
