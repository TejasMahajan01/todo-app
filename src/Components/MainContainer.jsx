import React, { useEffect, useState } from "react";

export default function MainContainer({
  incompleteTodos,
  completeTodos,
  setIncompleteTodos,
  setCompleteTodos,
  getStoredData,
  setStoredData,
}) {
  const [showCompleted, setShowCompleted] = useState(() =>
    JSON.parse(getStoredData("showCompleted", false))
  );

  useEffect(() => {
    setStoredData("showCompleted", showCompleted);
  }, [showCompleted]);

  function handleTodoUpdate(id, listType) {
    let clickedTodo;

    if (listType === "complete") {
      clickedTodo = completeTodos.find((todo) => todo.id === id);
    } else if (listType === "incomplete") {
      clickedTodo = incompleteTodos.find((todo) => todo.id === id);
    }

    // Toggle completion status of the clicked todo item
    clickedTodo.completed = !clickedTodo.completed;

    // Update state based on completion status
    if (clickedTodo.completed) {
      setCompleteTodos((prevCompleteTodos) => [
        ...prevCompleteTodos,
        clickedTodo,
      ]);
      setIncompleteTodos((prevIncompleteTodos) =>
        prevIncompleteTodos.filter((todo) => todo.id !== id)
      );
    } else {
      setIncompleteTodos((prevIncompleteTodos) => [
        ...prevIncompleteTodos,
        clickedTodo,
      ]);
      setCompleteTodos((prevCompleteTodos) =>
        prevCompleteTodos.filter((todo) => todo.id !== id)
      );
    }
  }

  function handleTodoDelete(event, id, listType) {
    // Prevent the click event from bubbling up to the li
    event.stopPropagation();

    if (listType === "complete") {
      setCompleteTodos((prevCompletedTodos) =>
        prevCompletedTodos.filter((todo) => todo.id !== id)
      );
    } else if (listType === "incomplete") {
      setIncompleteTodos((prevIncompleteTodos) =>
        prevIncompleteTodos.filter((todo) => todo.id !== id)
      );
    }
  }
  return (
    <main
      className="main-container"
      style={{
        paddingBottom:
          completeTodos.length + incompleteTodos.length > 10
            ? "10rem"
            : "inherit",
      }}
    >
      {/* Show Incomplete Todos */}
      {incompleteTodos.length > 0 && (
        <ul className="todo-list incomplete-todos-list">
          {incompleteTodos.map((todo) => (
            <li
              key={todo.id}
              className="todo-list__item"
              onClick={() => handleTodoUpdate(todo.id, "incomplete")}
            >
              <span className="todo-list__item-content">{todo.task}</span>
              <button
                type="button"
                className="todo-list__item-cross-icon fa-solid fa-xmark"
                onClick={(e) => handleTodoDelete(e, todo.id, "incomplete")}
              ></button>
            </li>
          ))}
        </ul>
      )}

      {/* Show Complete todos and Complete Task Toggle Button */}
      {completeTodos.length > 0 && (
        <>
          {/* Complete task toggle to show and hide complete todos list */}
          <button
            type="button"
            className={`complete-task-toggle ${
              showCompleted ? "opened" : "closed"
            }`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {`Completed ${completeTodos.length}`}
          </button>

          {/* Show Complete Todos if showCompleted is 'true' or 'opened' */}
          {showCompleted && (
            <ul className="todo-list complete-todos-list">
              {completeTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="todo-list__item completed"
                  onClick={() => handleTodoUpdate(todo.id, "complete")}
                >
                  <span className="todo-list__item-content">{todo.task}</span>
                  <button
                    type="button"
                    className="todo-list__item-cross-icon fa-solid fa-xmark"
                    onClick={(e) => handleTodoDelete(e, todo.id, "complete")}
                  ></button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
