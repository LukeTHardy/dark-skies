import { Route, Outlet, Routes } from "react-router-dom";
import { NavBar } from "../components/header/NavBar";
import { Banner } from "../components/header/Banner";
import { NewLocationForm } from "../components/forms/NewLocationForm";
import { Welcome } from "../components/welcome/Welcome";
import { useEffect, useState } from "react";
import { LocationsList } from "../components/locations/LocationsList";
import { LocationDetails } from "../components/locations/LocationDetails";
import { Favorites } from "../components/locations/Favorites";
import { EditLocation } from "../components/forms/EditLocation";
import { StationTracker } from "../components/extras/StationTracker";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLat(latitude);
          setUserLong(longitude);
          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    const localSkiesUser = localStorage.getItem("skies_user");
    const skiesUserObject = JSON.parse(localSkiesUser);
    setCurrentUser(skiesUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Banner />
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="add-location"
          element={<NewLocationForm currentUser={currentUser} />}
        />
        <Route path="locations">
          <Route
            index
            element={
              <LocationsList
                currentUser={currentUser}
                userLat={userLat}
                userLong={userLong}
              />
            }
          />
          <Route
            path=":locationId"
            element={
              <LocationDetails
                currentUser={currentUser}
                userLat={userLat}
                userLong={userLong}
              />
            }
          />
          <Route
            path=":locationId/edit"
            element={<EditLocation currentUser={currentUser} />}
          />
          <Route
            path="favorites"
            element={<Favorites currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="station"
          element={<StationTracker currentUser={currentUser} />}
        />
        {/* <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route> */}
        {/* <Route path="customers">
          <Route index element={<CustomersList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route> */}
      </Route>
    </Routes>
  );
};

// useEffect(() => {
//     const localHoneyUser = localStorage.getItem("honey_user");
//     const honeyUserObject = JSON.parse(localHoneyUser);
//     setCurrentUser(honeyUserObject);
//   }, []);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <>
//             <NavBar />
//             <Outlet />
//           </>
//         }
//       >
//         <Route index element={<Welcome />} />
//         <Route
//           path="tickets"
//           element={<TicketList currentUser={currentUser} />}
//         />
//         <Route path="employees">
//           <Route index element={<EmployeeList />} />
//           <Route path=":employeeId" element={<EmployeeDetails />} />
//         </Route>
//         <Route path="customers">
//           <Route index element={<CustomersList />} />
//           <Route path=":customerId" element={<CustomerDetails />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
