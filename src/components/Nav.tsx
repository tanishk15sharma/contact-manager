import React from "react";

const Nav = ({ title }: { title: string }) => {
  return (
    <nav className="flex items-start justify-center bg-blue-300 w-full py-2">
      <h1>{title}</h1>
    </nav>
  );
};

export { Nav };
