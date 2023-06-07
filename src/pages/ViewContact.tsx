import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contactType } from "../features/ContactsSlice";
import { useSelector } from "react-redux";
const ViewContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allContacts } = useSelector((state: any) => state?.contacts);

  const selectedContact = allContacts.find(
    (contact: contactType) => contact.id === id
  );

  return (
    <main
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-zinc-500/50"
      onClick={() => navigate("/")}
    >
      <div
        className="bg-white  max-h-[70%] p-8 overflow-auto border w-4/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded-md shadow-2xl mt-28"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="text-center mb-4 font-semibold">Contact Details</h1>
          <h3>
            {" "}
            <span className="text-gray-500">First Name: </span>{" "}
            {selectedContact.firstName}
          </h3>
          <h3>
            {" "}
            <span className="text-gray-500">Last Name: </span>
            {selectedContact.lastName}
          </h3>
          <h3>
            {" "}
            <span className="text-gray-500">Is Active: </span>
            {selectedContact.isActive ? "Yes" : "No"}
          </h3>
        </div>
      </div>
    </main>
  );
};

export { ViewContact };
