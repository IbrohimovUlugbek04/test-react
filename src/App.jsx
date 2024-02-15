import React, { useState } from "react";
console.log(import.meta.env);

function App() {
  let arr = [
    { id: "1asd23123", name: "salom1" },
    { id: "2112hansjanj1213", name: "salom2" },
    { id: "31213n123j1nsdhb", name: "salom3" },
    { id: "41231jascnajsnjaenwj", name: "salom4" },
  ];

  const [listItems, setListItems] = useState([]);

  const handleClick = (id, evt) => {
    const value = id;
    console.log(value);

    const newItems = arr
      .filter((item) => id === item.id)
      .map((item) => {
        return <li key={item.id}>{item.name}</li>;
      });
    setListItems(newItems);
  };

  let result = [];
  arr.forEach((e) => {
    result.push(
      <button key={e.id} onClick={(evt) => handleClick(e.id, evt)}>
        {e.name}
      </button>
    );
  });

  return (
    <>
      {result}
      {listItems.length > 0 && <ul className="list">{listItems}</ul>}
    </>
  );
}

export default App;
