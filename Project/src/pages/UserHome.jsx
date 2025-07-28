import Hero from "../components/home/hero";
import About from "../components/home/about";
import React, { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import Standard from "../components/home/standard";
import { useLocation } from "react-router-dom";
import LocationCard from "../components/home/locationCard";

const UserHome = () => {
  const location = useLocation();
  const [showLocation, setShowLocationCard] = useState(false);

  useEffect(() => {
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
          }}
        />
      )}
        {/* <Hero /> */}
        <About />
        <Standard />
    </UserLayout>
  );
};

export default UserHome;
