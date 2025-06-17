import Hero from "../components/home/hero";
import About from "../components/home/about";
import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import Standard from "../components/home/standard";
import { useLocation } from "react-router-dom";
import Blog from "../components/home/blog";
import LocationCard from "../components/home/locationCard";
import UserMap from "../components/home/UserMap";

const UserHome = () => {
  const location = useLocation();
  const [showLocation, setShowLocationCard] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(0);

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

    if (location.state?.justLoggedIn) {
      setShowLocationCard(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <UserLayout>
      {showLocation && (
        <LocationCard
          onClose={() => {
            setShowLocationCard(false);
            setLocationUpdated((prev) => prev + 1);
          }}
        />
      )}
      <Hero />
      <About />
      <Standard />
      <Blog />
      <UserMap key={locationUpdated} />
    </UserLayout>
  );
};

export default UserHome;
