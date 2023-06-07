import React from "react";
import { contactType, deleteContact } from "../features/ContactsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
interface contactCardType {
  contact: contactType;
  setContact: React.Dispatch<React.SetStateAction<contactType>>;
  handleModalToggle: () => void;
}

const ContactCard = ({
  contact,
  setContact,
  handleModalToggle,
}: contactCardType) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      key={contact.id}
      className="flex flex-col items-center bg-white justify-around 
border border-[#D9D9D9] w-[22%] px-4 py-2 rounded-md  cursor-pointer hover:shadow-lg transition-all duration-200
"
    >
      <span className="material-icons-outlined text-gray-500">
        account_circle
      </span>
      <h4 className="text-sm my-2">
        {contact.firstName} {contact.lastName}{" "}
      </h4>
      <div className="flex items-center justify-around w-[80%]">
        <button title="View">
          <Link to={`/contact/${contact.id}`}>
            <span className="material-icons-outlined text-xl text-blue-400 hover:text-blue-500">
              visibility
            </span>
          </Link>
        </button>
        <button
          title="Edit"
          onClick={() => {
            setContact(contact);
            handleModalToggle();
          }}
        >
          <span className="material-icons-outlined text-xl text-yellow-400 hover:text-yellow-500">
            edit
          </span>
        </button>
        <button
          title="Delete"
          onClick={() => dispatch(deleteContact(contact.id))}
        >
          <span className="material-icons-outlined text-xl text-red-400 hover:text-red-500">
            delete
          </span>
        </button>
      </div>
    </div>
  );
};

export { ContactCard };
