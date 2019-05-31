var tbody= d3.select("tbody")

data.forEach(observation => {
  var tRow= tbody.append("tr");
  Object.values(observation)
      .forEach(value => {
          tRow.append("td").text(value);
      } 
      );
});

console.log(data.length);
console.log(typeof data);

var filterButton= d3.select("#filter-btn");

var dateInputElement= d3.select("input");


dateInputElement.on('change', function() {
  var dateInputEntry= dateInputElement.property('value');
  console.log(dateInputEntry);
});

filterButton.on("click", function() {
  d3.event.preventDefault();

  tbody.selectAll("tr").remove();
  
  var dateInputEntry= dateInputElement.property('value');

  var dateMatch= data.filter(observation => {
    return observation.datetime == dateInputEntry;
  });
  console.log(dateMatch.length);

  dateMatch.forEach(observation => {
    var tRow= tbody.append("tr");
    Object.values(observation)
      .forEach(value => {
          tRow.append("td").text(value);
    });
  });
});