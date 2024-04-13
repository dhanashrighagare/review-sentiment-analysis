// App.js
import React from "react";
import ReviewList from "./components/ReviewList";

function App() {
  return (
    <div className="App w-full h-full flex flex-col items-center justify-center mt-5">
      <h1 className="font-bold text-3xl mb-6">Reviews</h1>
      <div className="border border-gray-300 rounded-lg shadow-lg p-6">
        <ReviewList />
      </div>
    </div>
  );
}

export default App;
