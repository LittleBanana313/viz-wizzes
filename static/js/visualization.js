// use Jquery to color and resize text
$(document).ready( function(){
  var size = $("#colorme").css("fontSize");
  $("#colorme").hover(
          function(){
              $(this).css("fontSize", "100px");
          }, 
          function(){
              $(this).css("fontSize", size);
          }
   );
}); 

  //This function will allow you to group an object by a property (specific key, in our case). 
  //data_array is your JS object to pass, property is the key you want to group by
  function groupBy(data_array, property) {
    return data_array.reduce(function (accumulator, current_object) {
      let key = current_object[property];
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(current_object);
      return accumulator;
    }, {});
  }
  //This function will allow you to count up the instances of values within an object and create a new JS object with this info.
  //object_array is the object to pass and, property is the key you want to use to count values within ("private_state" for S or P counts)
  function countBy(object_array, property) {
    return object_array.reduce(function (accumulator, current_object) {
      let key = current_object[property];
      if (!accumulator[key]) {
        accumulator[key] = 0;
      }
      accumulator[key]++;
      return accumulator;
    }, {});
  }

  //This function is very specific for the plotting needs of this dashboard, after using the countBy function.
  //This allows the creation of separate arrays from the countBy JS object that was created.
  //count_by_data is the JS object created in countBy, property is the value you want in your array.
  //This will also put a 0 in place where the value does not exist in the JS object you pass.  
  function get_display_data(count_by_data, property) {
    return Object.values(count_by_data).map(item => {
      return item[property] || 0;
    });
  }

  function buildcharts() {

    // Use `d3.json` to fetch the sample data for the plots might break if deployed to heroku
    d3.json('db_call').then((data) => {

      // grab age column
      let demo = data.map(cell1 => cell1.age_group)
      // console.log(demo)

      // filter age column by age ranges and record a list of counts
      let donut_values = [demo.filter(c => c === '<18').length,
      demo.filter(c => c === '18-24').length,
      demo.filter(c => c === '25-44').length,
      demo.filter(c => c === '45-64').length,
      demo.filter(c => c === '65+').length];
      console.log(donut_values)


      // create an array of object to be indexed by stacked bar chart
      var groupbyResult = groupBy(data, "perp_race");
      // console.log("countBy:", countBy(data, "law_cat_cd"));
      var plot_data_list = Object.entries(groupbyResult).map(row => {
        var result = {};
        result[row[0]] = countBy(row[1], "law_cat_cd");
        return result;
      }
      );

      var xvalues = plot_data_list.map(item => Object.keys(item)[0]);
      var yvalues_M = plot_data_list.map(item => Object.values(item)[0]['M']);
      var yvalues_F = plot_data_list.map(item => Object.values(item)[0]['F']);

      // create doughnut chart
      var donut = [{
        values: donut_values,
        labels: ['<18', '18-24', '25-44', '45-64', '65+'],
        hole: 0.4,
        type: 'pie'
      }];

      var layout = {
        height: 400,
        width: 500
      };

      Plotly.newPlot('donut', donut, layout);

      // create stacked bar chart
      var trace2 = {
        x: xvalues,
        y: yvalues_M,
        name: 'Misdemeanors',
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

      var trace3 = {
        x: xvalues,
        y: yvalues_F,
        name: 'Felonies',
        type: 'bar',
        textposition: 'auto',
        hoverinfo: 'none',
        marker: {
          color: 'rgb(255,153,0)',
          opacity: 0.6,
          line: {
            color: 'rgb(255, 102,0)',
            width: 1.5
          }
        }
      };

      var stacking = [trace2, trace3];

      var layout2 = {
        barmode: 'stack'
      };

      Plotly.newPlot('bubble', stacking, layout2);


    })
  }

  buildcharts()