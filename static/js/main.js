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


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
  document.getElementById("shapeDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}


/////////////////////////
// Get unique Shape values to add into a drop-down box
/////////////////////////

// Assign values of Shape to a Set to gather only unique values into array
var shapeArray= data.map(value => value.shape)

// Create function for creating an array out of unique values
function getUnique(arr) {
uniqueArr= []
arr.forEach(item => {
  if (!uniqueArr.includes(item)) {
    uniqueArr.push(item)
  }
});
return uniqueArr
};

// Call the function to create the array
var shapeUnique= getUnique(shapeArray)

// Append items to dropdown menu
shapeUnique.forEach(shape => {
  var menuShape= document.createElement("option");
  var textShape= document.createTextNode(shape);
  menuShape.value= shape;
  menuShape.appendChild(textShape);
  document.getElementById("shape").appendChild(menuShape);
});

// Bind actions to dropdown button
var shapeSelect= d3.select("shape")

shapeSelect.on("click", function() {
  d3.event.preventDefault();
  dropdownFunction();
});





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