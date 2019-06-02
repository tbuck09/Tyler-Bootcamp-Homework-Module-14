/////////////////////////
// Load the table upon opening the page
/////////////////////////

// Select the table body
var tbody = d3.select("tbody")
// Add a row for each object in data.js
data.forEach(observation => {
  var tRow = tbody.append("tr");
  Object.values(observation)
    .forEach(value => {
      tRow.append("td").text(value);
    }
    );
});
// Log the length to make sure it works
console.log(data.length);


/////////////////////////
//////////////////////////////////////////////////
// Create behavior for filter button
// This should return only the rows that are specified in the filter field (left column)
//////////////////////////////////////////////////
/////////////////////////

// Select the filter button
var filterButton = d3.select("#filter-btn");

// Select the fields for entering desired filter terms
var dateInputElement = d3.select("#datetime");
var cityInputElement = d3.select("#city");
var stateInputElement = d3.select("#state");
var countryInputElement = d3.select("#country");
var shapeInputElement = d3.select("#shape");


// Create function that allows for filtering on multiple keys
function filter_many(arr, filt) {
  var filtKeys = Object.keys(filt);
  return arr.filter(item => {
    return filtKeys.every(key => {
      // Allows for empty fields
      if (filt[key].length == 0) return true;
      return filt[key].includes(item[key]);
    });
  });
};


/////////////////////////
// Create behavior for filter button clicks
/////////////////////////

filterButton.on("click", function () {
  // Resist reloading of the page
  d3.event.preventDefault();
  // Remove all rows from the page
  tbody.selectAll("tr").remove();
  
  // Assign values in the filter entry fields to variables
  var dateInputEntry = dateInputElement.property('value');
  var cityInputEntry = cityInputElement.property('value');
  var stateInputEntry = stateInputElement.property('value');
  var countryInputEntry = countryInputElement.property('value');
  var shapeInputEntry = shapeInputElement.property('value');
  
  // Add values to an object for passing into the filter function
  var filter = {
    datetime: dateInputEntry,
    city: cityInputEntry,
    state:stateInputEntry,
    country:countryInputEntry,
    shape:shapeInputEntry
  };

  // Save results from filter function to a variable
  var searchResults = filter_many(data, filter);
  // Log length to make sure it worked
  console.log(searchResults.length);

  // Append rows from the filter to the table body
  searchResults.forEach(observation => {
    var tRow = tbody.append("tr");
    Object.values(observation)
      .forEach(value => {
        tRow.append("td").text(value);
      });
  });
});