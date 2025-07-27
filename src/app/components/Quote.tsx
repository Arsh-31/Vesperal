import React, { useEffect, useState } from "react";

// Fetch multiple quotes from DummyJSON
const fetchQuotes = async () => {
  const res = await fetch("https://dummyjson.com/quotes?limit=30");
  const data = await res.json();
  return data.quotes;
};

export const Quote = () => {
  const [quotes, setQuotes] = useState<{ quote: string; author: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getQuotes = async () => {
      const quotesData = await fetchQuotes();
      setQuotes(quotesData);
      setLoading(false);
    };

    getQuotes();
  }, []);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#272030] p-6 sm:p-8 rounded-sm shadow-lg flex flex-col items-center justify-center space-y-6 text-center">
        <p className="text-lg sm:text-xl font-serif italic text-[#e3ebf2] leading-relaxed">
          {loading ? "Loading..." : `"${quotes[index]?.quote}"`}
        </p>

        {!loading && (
          <p className="self-end text-sm sm:text-base font-semibold text-[#e3ebf2] mt-2">
            — {quotes[index]?.author}
          </p>
        )}

        <button
          onClick={nextQuote}
          className="px-6 py-2 bg-[#e3ebf2] text-[#272030] rounded-sm text-base font-semibold transition"
        >
          Next Quote
        </button>
      </div>
    </div>
  );
};
