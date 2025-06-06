// "use client";

// import React, { useEffect, useState } from "react";

// export const Quote = () => {
//   const [quote, setQuote] = useState("");

//   useEffect(() => {
//     fetch("https://zenquotes.io/api/random")
//       .then((res) => res.json())
//       .then((data) => setQuote(`${data[0].q} — ${data[0].a}`))
//       .catch((err) => {
//         console.error(err);
//         setQuote("Failed to fetch quote.");
//       });
//   }, []);

//   return <div>{quote || "Loading quote..."}</div>;
// };

import React, { useState } from "react";

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
];

export const Quote = () => {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#fef6f6] dark:bg-[#2b2222] p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-6 text-center">
        <p className="text-lg sm:text-xl font-serif italic text-[#6b4c4c] dark:text-[#f4d6d6] leading-relaxed">
          "{quotes[index].text}"
        </p>

        <p className="self-end text-sm sm:text-base font-semibold text-[#7e4a4a] dark:text-[#d9bcbc] mt-2">
          — {quotes[index].author}
        </p>

        <button
          onClick={nextQuote}
          className="px-6 py-2 bg-[#b39f9f] hover:bg-[#a38686] text-white rounded-xl text-base font-semibold transition"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
};
