//   Trying to build a histogram that includes type of offense (misdemeanor, violation felony) on x-axis and
// count of offenses on the y-axis

function buildcharts() {

  // Use `d3.json` to fetch the sample data for the plots
  d3.json('db_call').then((data) => {

    let demo = data.map(cell1 => cell1.perp_race)
    console.log(demo)
    
    let bubvalues = [demo.filter(c => c === 'AMERICAN INDIAN/ALASKAN NATIVE').length, demo.filter(c => c === 'ASIAN / PACIFIC ISLANDER').length, 
    demo.filter(c => c === 'BLACK').length, demo.filter(c => c === 'BLACK HISPANIC').length,
    demo.filter(c => c === 'WHITE').length, demo.filter(c => c === 'WHITE HISPANIC').length] ;
    console.log(bubvalues)

    let offense_severity = data.map(cell => cell.law_cat_cd);
    

    var yvalues = [offense_severity.filter(c => c === 'M').length, offense_severity.filter(c => c === 'F').length] ;
    

    var xValue = ['Misdemeanors', 'Felonies'];

    var trace1 = {
      x: xValue,
      y: yvalues,
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
      title: 'Crimes in NY by Severity',
      barmode: 'stack'
    };

    Plotly.newPlot('severity-chart', data, layout);


    // var DataBubble = [
    //   {
    //     x: demo,
    //     y: bubvalues,
    //     text: demo,
    //     mode: "markers",
    //     marker: {
    //       color: demo,
    //       size: bubvalues,
    //     }
    //   }
    // ];

    // Plotly.newPlot("bubble", DataBubble);
    var trace2 = {
      x: demo,
      y: bubvalues,
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

    var data = [trace2];

    var layout2 = {
      title: 'Crimes in NY by Demographic ',
      barmode: 'stack'
    };

    Plotly.newPlot('bubble', data, layout2);


  })
}

buildcharts()
