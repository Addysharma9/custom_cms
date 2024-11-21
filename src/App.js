// App.js
import React from 'react';
import Searchbar from './components/searchbar/Searchbar';
import searchData from './search.json'; // Make sure the path is correct

function App() {
  const dropdownData = [
    {
      name: "Name",
      type: "string",
      searchOptions: ["like", "equalto"]
    },
    {
      name: "LastName",
      type: "string",
      searchOptions: ["like", "equalto"]
    },
    {
      name: "Quantity",
      type: "int",
      searchOptions: ["exact", "greater", "smaller"]
    },
    {
      name: "ItemName",
      type: "string",
      searchOptions: ["like", "equalto"]
    }
  ];

  return (
    <div className="App">
      <Searchbar dropdownData={dropdownData} searchData={searchData} />
    </div>
  );
}

export default App;
