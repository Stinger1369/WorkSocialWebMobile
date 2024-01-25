import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditUserProfilScreen from "./pages/EditUserProfilScreen/EditUserProfilScreen";
import MyUserProfilScreen from "./pages/MyUserProfilScreen/MyUserProfilScreen";
import BarNav from "./components/BarNav/BarNav";

import HomeScreen from "./pages/HomeScreen/HomeScreen";
import PostScreen from "./pages/PostScreen/PostScreen";
import ConnexionScreen from "./pages/ConnexionScreen/ConnexionScreen";
import InscriptionScreen from "./pages/InscriptionScreen/InscriptionScreen";
import EventsScreen from "./pages/EventsScreen/EventsScreen";
import SendageScreen from "./pages/SendageScreen/SendageScreen";
import MembersScreen from "./pages/MembersScreen/MembersScreen";
import MyProfileScreen from "./pages/MyProfileScreen/MyProfileScreen";
import { AuthProvider } from "./utils/useConnecte";

import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <BarNav />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />
            <Route path="/PostScreen" element={<PostScreen />} />
            <Route path="/ConnexionScreen" element={<ConnexionScreen />} />
            <Route path="/InscriptionScreen" element={<InscriptionScreen />} />
            <Route path="/EventsScreen" element={<EventsScreen />} />
            <Route path="/SendageScreen" element={<SendageScreen />} />
            <Route path="/MembersScreen" element={<MembersScreen />} />
            <Route path="/profile/:userId" element={<MyProfileScreen />} />
            <Route path="/myprofil" element={<MyUserProfilScreen />} />
            <Route path="/editprofil" element={<EditUserProfilScreen />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
