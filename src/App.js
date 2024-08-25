import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Set the document title to your roll number
  document.title = "21BCE3927"; // Set your roll number as the document title

  // Function to validate if the input is a valid JSON
  const validateJson = (input) => {
    try {
      const parsed = JSON.parse(input);
      // Basic validation to check if it's a valid JSON
      return !!parsed;
    } catch (e) {
      return false;
    }
  };

  // Handle change in the input field
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setIsValidJson(validateJson(e.target.value));
  };

  // Handle submission of the JSON input
  const handleSubmit = async () => {
    if (isValidJson) {
      try {
        const response = await axios.post("https://bajaj-production-827f.up.railway.app/bfhl", JSON.parse(jsonInput));
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Handle change in dropdown selection
  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  // Function to filter and render the response data based on the dropdown selection
  const renderFilteredData = () => {
    if (!responseData) return null;

    let filteredData = [];

    // Filter alphabets
    if (selectedOptions.includes("Alphabets")) {
      filteredData = filteredData.concat(responseData.alphabets);
    }

    // Filter numbers
    if (selectedOptions.includes("Numbers")) {
      filteredData = filteredData.concat(responseData.numbers);
    }

    // Get the highest lowercase alphabet
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.push(responseData.highest_lowercase_alphabet);
    }

    return filteredData.join(", ");
  };

  return (
    <div className="App">
      <h1>JSON Input Form</h1>
      <textarea
        placeholder="Enter JSON here..."
        value={jsonInput}
        onChange={handleInputChange}
      />
      {!isValidJson && <p style={{ color: "red" }}>Invalid JSON format</p>}
      <button onClick={handleSubmit} disabled={!isValidJson}>
        Submit
      </button>

      {responseData && (
        <div>
          <h2>Select options to filter data</h2>
          <select multiple={true} onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {selectedOptions.length > 0 && (
        <div>
          <h3>Filtered Data:</h3>
          <p>{renderFilteredData()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
