import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(start, end);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 shadow-md rounded">
      <label className="block mb-2">
        Start Location:
        <input
          type="text"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Enter start location"
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        End Location:
        <input
          type="text"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="Enter end location"
          className="w-full p-2 border rounded"
        />
      </label>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate Toll
      </button>
    </form>
  );
};

export default InputForm;
