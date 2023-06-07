import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  addContact,
  contactType,
  editContact,
} from "../features/ContactsSlice";
interface formProps {
  contactDetails: contactType;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (value: boolean) => void;
  handleModalToggle: () => void;
}

const ContactForm = ({
  contactDetails,
  handleInput,
  handleCheckbox,
  handleModalToggle,
}: formProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(contactDetails.id.length);
    if (contactDetails.id.length === 0) {
      const NewContactDetails = {
        ...contactDetails,
        id: uuidv4(),
      };
      dispatch(addContact(NewContactDetails));
      handleModalToggle();
    } else {
      dispatch(editContact(contactDetails));
      handleModalToggle();
      console.log("editdd");
    }
  };
  console.log(contactDetails);

  return (
    <main
      className="fixed inset-0 h-screen w-screen flex justify-center items-start z-30 bg-zinc-500/50"
      onClick={handleModalToggle}
    >
      <div
        className="bg-white min-h-[40%] max-h-[70%] p-4 overflow-auto border w-4/12 min-w-96 tablet:w-8/12 mobile:w-11/12 rounded-md shadow-2xl mt-28"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center mb-5">
          {" "}
          {contactDetails.id.length === 0 ? "Create Contact" : "Edit Contact"}
        </h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="my-3">
            <label htmlFor="firstName ">First Name:</label>
            <input
              id="firstName"
              type="text"
              required
              onChange={(e) => handleInput(e)}
              value={contactDetails.firstName}
              className="border rounded mx-4 focus:outline-none py-1 px-2"
            />
          </div>
          <div className="my-3">
            <label htmlFor="lastName ">Last Name:</label>
            <input
              id="lastName"
              type="text"
              required
              onChange={(e) => handleInput(e)}
              value={contactDetails.lastName}
              className="border rounded mx-4 focus:outline-none py-1 px-2"
            />
          </div>{" "}
          <div className="flex gap-12 my-3">
            <label htmlFor="">Status:</label>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="active"
                  checked={contactDetails.isActive}
                  onChange={() => handleCheckbox(true)}
                />
                <label htmlFor="active" className="mx-2 text-gray-500 ">
                  Active
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="inActive"
                  checked={!contactDetails.isActive}
                  onChange={() => handleCheckbox(false)}
                />
                <label htmlFor="inActive" className="mx-2 text-gray-500 ">
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <button className=" w-full hover:bg-blue-300 my-4 gap-2  bg-blue-200 py-2 px-3 rounded ">
            {contactDetails.id.length === 0
              ? "Save Contact"
              : "Save Edited Contact"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactForm;
