import React, { useEffect, useRef, useState } from "react";
import { generateRandomToken, getRandomPlaceholder } from "../utils";

export default function Footer({ setIncompleteTodos }) {
  const [inputValue, setInputValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.placeholder =
      inputFocus && textareaRef.current.offsetWidth > 300
        ? `Try typing "${getRandomPlaceholder()}"`
        : "Add a task";
  }, [inputFocus]);

  useEffect(() => {
    updateHeight();
  }, [inputValue]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  }

  function addTodo() {
    if (inputValue.trim()) {
      // Check if todo is not empty
      const todo = {
        id: generateRandomToken(12),
        task: inputValue.trim(),
        completed: false, // Bydefault todo is incomplete
      };
      setIncompleteTodos((prevTodos) => [todo, ...prevTodos]); // Insert new todo at the beginning of the array
      setInputValue(""); // Clear input field after adding todo
    }
  }

  function updateHeight() {
    if (!textareaRef.current) return; // Ensure textareaRef is valid

    const updatedHeight =
      inputValue.length === 0
        ? "auto"
        : `${textareaRef.current.scrollHeight / 16}rem`;

    textareaRef.current.style.height = updatedHeight;
  }

  return (
    <footer className="footer">
      <div className="input-group">
        <button
          type="button"
          className={`input-group__icon fa-regular ${
            inputFocus ? "fa-circle" : "fa-plus"
          }`}
          onClick={() => textareaRef.current.focus()}
        ></button>

        <textarea
          className="input-group__field"
          name="inputField"
          rows="1"
          maxLength={80}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        ></textarea>

        <button
          type="button"
          className="input-group__button fa-solid fa-arrow-up"
          onClick={() => addTodo()}
        ></button>
      </div>
    </footer>
  );
}
