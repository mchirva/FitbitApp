$(document).ready(function() {
	var response = $.ajax({
       url: "http://52.89.68.106:8080/auth/fitbit/",
       method: "get",
       success:function(response){
       		console.log(response);
       		
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        } 
    });
	// var response = $.ajax({
 //       url: "https://api.fitbit.com/1/user/3CH54G/activities/date/2016-01-26.json",
 //       method: "get",
 //       dataType:'json',
 //       headers: {
 //        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzQ0g1NEciLCJhdWQiOiIyMjdXWUYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IHJsb2MgcmhyIHJwcm8iLCJleHAiOjE0Nzc2NDIyNDgsImlhdCI6MTQ3NzYxMzQ0OH0.pApKwW0RXKzddGTpKVeS5BXA2ncLpANW5u--0wgPmaE'
 //       },
 //       success:function(response){
 //       		//console.log(JSON.stringify(response));
 //       		var data = {}; 
 //       		var goals=[];
 //       		data.goals=goals;
 //       		var goal=[
 //       			distance:response.goals.distance
 //       		];
 //       		data.goals.push(goal);

 //       		console.log(JSON.stringify(data));
 //       		$('#fitbitTable').DataTable({
 //       			"ajax": JSON.stringify(data.goals)
 //        	});
 //        },
 //        error: function(XMLHttpRequest, textStatus, errorThrown) { 
 //            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
 //        } 
 //    });
});