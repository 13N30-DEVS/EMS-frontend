import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md p-4 space-x-4">

      <div className={`text-3xl flex justify-center items-center ${color} text-white p-4 rounded-lg`}>
        {icon}
      </div>


      <div className="flex flex-col justify-center">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
