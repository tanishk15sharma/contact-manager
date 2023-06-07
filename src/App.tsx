import React from "react";
import { Routes, Route } from "react-router-dom";
import { ContactsManager } from "./pages/ContactsManager";
import { ChartsAndMaps } from "./pages/ChartsAndMaps";
import Sidebar from "./components/Sidebar";
import { ViewContact } from "./pages/ViewContact";
function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<ContactsManager />} />
            <Route path="/charts" element={<ChartsAndMaps />} />
            <Route path="/contact/:id" element={<ViewContact />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
