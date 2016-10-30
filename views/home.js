$(document).ready(function() {
	var data = [4, 8, 15, 16, 23, 42];
	var response={
	  "activities-heart": [
	    {
	      "dateTime": "2016-10-29",
	      "value": {
	        "customHeartRateZones": [],
	        "heartRateZones": [
	          {
	            "max": 93,
	            "min": 30,
	            "name": "Out of Range"
	          },
	          {
	            "max": 130,
	            "min": 93,
	            "name": "Fat Burn"
	          },
	          {
	            "max": 158,
	            "min": 130,
	            "name": "Cardio"
	          },
	          {
	            "max": 220,
	            "min": 158,
	            "name": "Peak"
	          }
	        ]
	      }
	    }
	  ]
	}

var l=response["activities-heart"][0].value.heartRateZones.length;
maxRate=[]
for(var i=0;i<l;i++){
	maxRate[i]=response["activities-heart"][0].value.heartRateZones[i].max;
}
label=[]
for(var i=0;i<l;i++){
	label[i]=response["activities-heart"][0].value.heartRateZones[i].name;
}
minRate=[]
for(var i=0;i<l;i++){
	minRate[i]=response["activities-heart"][0].value.heartRateZones[i].min;
}

	var x = d3.scaleLinear()
    .domain([d3.min(maxRate), d3.max(maxRate)])
    .range([d3.min(maxRate), d3.max(maxRate) * 2]);

    var y = d3.scaleLinear()
    .domain([d3.min(minRate), d3.max(minRate)])
    .range([d3.min(minRate), d3.max(minRate) * 2]);

console.log(label);
d3.select(".maxChart")
  .selectAll("div")
    .data(maxRate)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });

d3.select(".label")
  .selectAll("bar")
    .data(label)
  .enter().append("div")
    .text(function(d) { return d; });

d3.select(".minChart")
  .selectAll("div")
    .data(minRate)
  .enter().append("div")
    .style("width", function(d) { return y(d) + "px"; })
    .text(function(d) { return d; });
});

