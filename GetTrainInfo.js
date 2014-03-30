function GetSchedule() {
    var InboundAPI = "http://www3.septa.org/hackathon/NextToArrive/?req1=East%20Falls&req2=Market%20East&req3=2&callback=?";
    var OutboundAPI = "http://www3.septa.org/hackathon/NextToArrive/?req1=Market%20East&req2=East%20Falls&req3=2&callback=?"
    
    $.getJSON(InboundAPI, function (data) {
        $("#Inbound-List").empty();
        var i = 0;
        while(i < data.length)
        {
        	var lateText = "<span class = \"circleOnTime\">&#x2713;</span>";
			if (data[i].orig_delay != "On time")
			{
				lateText = "<span class = \"circleLate\">" + data[i].orig_delay.replace(" mins","") + "</span>";
			}
        	$("#Inbound-List").append("<li>" + lateText + "<span class=\"StartTime\">" + data[i].orig_departure_time + "<span><br><span class=\"EndTime\">Arrives at " + data[i].orig_arrival_time + "</span><br><br></li>");
			i++;
        }
    });
	
	$.getJSON(OutboundAPI, function (data) {
        $("#Outbound-List").empty();
        var i = 0;
        while(i < data.length)
        {
        	var lateText = "<span class = \"circleOnTime\">&#x2713;</span>";
			if (data[i].orig_delay != "On time")
			{
				
				lateText = "<span class = \"circleLate\">" + data[i].orig_delay.replace(" mins","") + "</span>";
			}
        	$("#Outbound-List").append("<li>" + lateText + "<span class=\"StartTime\">" + data[i].orig_departure_time + "<span><br><span class=\"EndTime\">Arrives at " + data[i].orig_arrival_time + "</span><br><br></li>");
			i++;
        }
    });
}