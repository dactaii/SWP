import Hero from "../components/home/hero";
import About from "../components/home/about";
import React, { useEffect } from "react";
import UserLayout from "../layouts/UserLayout";
import Standard from "../components/home/standard";
import { useLocation } from "react-router-dom";

const UserHome = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollToId) {
      const element = document.getElementById(location.state.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <UserLayout>
      <Hero />
      <About />
      <Standard />
    </UserLayout>
  );
};

export default UserHome;
