import React, { useEffect, useRef, useState } from "react";

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
        completed: false,
      };
      setIncompleteTodos((prevTodos) => [...prevTodos, todo]); // Add todo to incomplete todos because bydefault all todos will be unfinished
      setInputValue(""); // Clear input field after adding todo
    }
  }

  function generateRandomToken(length) {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenArray = new Uint8Array(length);
    crypto.getRandomValues(tokenArray);

    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = tokenArray[i] % charset.length;
      token += charset.charAt(randomIndex);
    }
    return token;
  }

  function updateHeight() {
    if (!textareaRef.current) return; // Ensure textareaRef is valid

    const updatedHeight =
      inputValue.length === 0
        ? "auto"
        : `${textareaRef.current.scrollHeight / 16}rem`;

    textareaRef.current.style.height = updatedHeight;
  }

  const placeholders = [
    "Implement a sorting algorithm in Python.",
    "Develop a restaurant website using React and Bootstrap.",
    "Pay the electricity bill by Friday at 6 p.m.",
    "Read 'The Art of Computer Programming' by Donald Knuth.",
    "Learn to play the guitar on Wednesday at 4 p.m.",
    "Watch 'The Matrix' on Netflix on Friday at 8 p.m.",
    "Play tennis with Steve on Saturday at 10 a.m.",
    "Organize the bookshelf by genre.",
    "Create a monthly budget.",
    "Practice 15 minutes of meditation at 5 a.m.",
  ];

  function getRandomPlaceholder() {
    let randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
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
