import React, { useState } from "react";
import { Nav } from "../components/Nav";
import ContactForm from "../components/ContactForm";
import { useSelector } from "react-redux";
import { contactType } from "../features/ContactsSlice";
import { ContactCard } from "../components/ContactCard";

const ContactsManager = () => {
  const { allContacts } = useSelector((state: any) => state?.contacts);
  const [toggleContactFromModal, setToggleContactFormModal] = useState(false);

  const [contact, setContact] = useState<contactType>({
    firstName: "",
    lastName: "",
    isActive: true,
    id: "",
  });
  console.log(allContacts);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact((previousData) => ({
      ...previousData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheckbox = (value: boolean) => {
    setContact((previousData) => ({ ...previousData, isActive: value }));
  };

  const handleContactModal = () => {
    setToggleContactFormModal((previousValue) => !previousValue);
  };
  console.log(allContacts);
  return (
    <main>
      <Nav title={"Contact Management"} />

      <div className="flex items-center justify-center my-16">
        <button
          className="flex items-center gap-2 bg-blue-200 py-2 px-3 rounded "
          onClick={() => {
            setContact({
              firstName: "",
              lastName: "",
              isActive: true,
              id: "",
            });
            handleContactModal();
          }}
        >
          <span className="material-icons-outlined">add</span>
          <span>Create Contact</span>
        </button>
      </div>
      {allContacts.length === 0 ? (
        <p className="text-center text-gray-500 py-14">
          No Contact Found
          <br />
          Please add contact from Create Contact Button{" "}
        </p>
      ) : (
        <section className="p-8 bg-zinc-50 flex gap-6 flex-wrap ">
          {allContacts?.map((contact: contactType) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              setContact={setContact}
              handleModalToggle={handleContactModal}
            />
          ))}
        </section>
      )}
      {toggleContactFromModal && (
        <ContactForm
          contactDetails={contact}
          handleInput={handleInputChange}
          handleCheckbox={handleCheckbox}
          handleModalToggle={handleContactModal}
        />
      )}
    </main>
  );
};

export { ContactsManager };
