import React from 'react';
import { FaCheckSquare } from "react-icons/fa";

const Items = ({ items }) => {
   //console.log(items);
  // Calculate the number of items in each column
  const itemsPerColumn = Math.ceil(items.length / 2);

  return (
    <div className="container mt-2">
      <div className="row">
        
        {Array.from({ length: 2 }, (_, columnIndex) => (
          <div key={columnIndex} className="col-md-6">
            <ul className="list-group">
              {items.slice(
                columnIndex * itemsPerColumn,
                (columnIndex + 1) * itemsPerColumn
              ).map((item, index) => (
                <li key={index} className="list-group-item">
                 <FaCheckSquare /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Items;