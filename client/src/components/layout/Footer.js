import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-light mt-5 p-4 text-center"
      style={{ backgroundColor: "#263238" }}
    >
      Copyright &copy; {new Date().getFullYear()} ToDo App
    </footer>
  );
}
