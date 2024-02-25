import React from "react";
import todoLogo from "../assets/todo-logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header-logo"
        src={todoLogo}
        alt="todo-logo"
        draggable="false"
      />
    </header>
  );
}
