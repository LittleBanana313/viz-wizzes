//   Trying to build a histogram that includes type of offense (misdemeanor, violation felony) on x-axis and
// count of offenses on the y-axis
  
  function buildCharts(sample) {
  
    // Use `d3.json` to fetch the sample data for the plots
    d3.json("../../nyc_crime.json").then((data) => {
      var samples = data.samples;
      var meta = data.metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var resultsarray = samples.filter(sampleobject =>
        sampleobject.id == sample);
      var result = resultsarray[0]
  
      console.log(data)
    //   var labels = result.law_cat_cd;
      var values = result[i];

        
      var xValue = ['Violations', 'Misdemeanors', 'Felonies'];
      
      var trace1 = {
      x: xValue,
      y: Value,
      type: 'bar',
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };
  
  var data = [trace1];
  
  var layout = {
    title: 'Crimes in NY',
    barmode: 'stack'
  };
  
  Plotly.newPlot('myDiv', data, layout);
