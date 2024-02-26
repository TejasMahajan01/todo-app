import React from "react";

export default function PlaceholderContainer({ placeholderItems }) {
  return (
    <>
      {placeholderItems > 0 && (
        <section className="placeholder-container">
          <ul className="placeholder-list">
            {Array(placeholderItems)
              .fill("")
              .map((_, id) => (
                <li key={id} className="placeholder-list__item"></li>
              ))}
          </ul>
        </section>
      )}
    </>
  );
}
