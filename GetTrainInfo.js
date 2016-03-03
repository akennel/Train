function ShowSettings(){
  $("#Time").fadeOut("fast");
  $("#Settings").fadeIn("fast");
}

function ShowTimes(){
  $("#Settings").fadeOut("fast");
  $("#Time").fadeIn("fast");  
}

function SaveChanges(){
  setCookie("HomeStationName", $("#HomeStationList :selected").text()); 
  setCookie("WorkStationName", $("#WorkStationList :selected").text());
  setCookie("LineName", $("#LinesList :selected").text());
  setCookie("LineID", $("#LinesList :selected").val());
  GetSchedule();
  $("#Settings").fadeOut("fast");
  $("#Time").fadeIn("fast");  
}
function CancelChanges(){
  if (DoesCookieExist()){
    $("#Settings").fadeOut("fast");
    $("#Time").fadeIn("fast"); 
  }  
}

function GetLines(){
  var linesAPI = "http://turtlemafia.org/wp-content/plugins/GetTrainInfo/lines.json";
  $.getJSON(linesAPI, function (data){
    $("#LinesList").empty();
    var i = 0;
    while(i<data.length){
      $("#LinesList").append("<option value=" + data[i].Line_ID + ">" + data[i].Line_Name + "</option>");
      i++;
    }
    
    var selectedLine = getCookie("LineID");
    if (selectedLine != null){
      $("#LinesList").val(selectedLine);
      GetStations(selectedLine);
    }
    else{
      GetStations("AIR");
    }
  });
}

function DoesCookieExist(){
  var homeStationName = getCookie("HomeStationName");
  var workStationName = getCookie("WorkStationName");
  
  if (homeStationName != null && workStationName != null){
    return true;
  }
  else{
    return false;
  }    
}

function GetStations(lineID){
  var stationAPI = "http://turtlemafia.org/wp-content/plugins/GetTrainInfo/stations.json";
  $.getJSON(stationAPI, function (data){
    $("#HomeStationList").empty();
    $("#WorkStationList").empty();
    var i = 0;
    while(i<data.length){      
      var currentStationLine = data[i].Station_Line;
      var currentStationName = data[i].Station_Name;
      if (currentStationLine.toString().indexOf(lineID) >= 0){
        var currentStation = "<option value=\"" + currentStationName + "\">" + currentStationName + "</option>";
        if (currentStationName != "30th Street Station" && currentStationName != "Suburban Station" && currentStationName != "Market East" && currentStationName != "Temple U"){
          $("#HomeStationList").append(currentStation);
        }
        if (currentStationName == "30th Street Station" || currentStationName == "Suburban Station" || currentStationName == "Market East" || currentStationName == "Temple U"){
          $("#WorkStationList").append(currentStation);
        }
      }            
      i++;
    }
    if (DoesCookieExist()){
      var homeName = getCookie("HomeStationName");
      var workName = getCookie("WorkStationName");
      $("#HomeStationList").val(getCookie("HomeStationName"));
      $("#WorkStationList").val(getCookie("WorkStationName"));
    }
  });
}

function GetStationsForLine(){
  var selectedLine = $("#LinesList :selected").val();
  GetStations(selectedLine);
}

function GetSchedule() {
    $("#Line").text(getCookie("LineName"));
    $("#Inbound").text(getCookie("HomeStationName") + " Inbound");
    $("#Outbound").text(getCookie("WorkStationName") + " Outbound");
    var InboundAPI = "http://www3.septa.org/hackathon/NextToArrive/?req1=" + getCookie("HomeStationName") + "&req2=" + getCookie("WorkStationName") + "&req3=2&callback=?";
    var OutboundAPI = "http://www3.septa.org/hackathon/NextToArrive/?req1=" + getCookie("WorkStationName")  + "&req2=" + getCookie("HomeStationName") + "&req3=2&callback=?"
    
    $.getJSON(InboundAPI, function (data) {
        $("#Inbound-List").empty();
        var i = 0;
        while(i < data.length)
        {
        	var lateText = "<span class = \"circleOnTime\">&#x2713;</span>";
			if (data[i].orig_delay != "On time")
			{
				var delayTime = data[i].orig_delay.replace(" mins", "");
                delayTime = delayTime.replace(" min", "");
                if (delayTime == 999)
                {  
                	lateText = "<span class = \"circleLate\">" + "X" + "</span>";
                } 
                else if ( delayTime > 9)
                {
                	lateText = "<span class = \"circleLateSmall\">" + delayTime + "</span>";
                }
                else
                {
                	lateText = "<span class = \"circleLate\">" + delayTime + "</span>";
                }
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
				var delayTime = data[i].orig_delay.replace(" mins", "");
                delayTime = delayTime.replace(" min", "");
                if (delayTime == 999)
                {  
                	lateText = "<span class = \"circleLate\">" + "X" + "</span>";
                } 
                else if ( delayTime > 9)
                {
                	lateText = "<span class = \"circleLateSmall\">" + delayTime + "</span>";
                }
                else
                {
                	lateText = "<span class = \"circleLate\">" + delayTime + "</span>";
                }
				
			}
        	$("#Outbound-List").append("<li>" + lateText + "<span class=\"StartTime\">" + data[i].orig_departure_time + "<span><br><span class=\"EndTime\">Arrives at " + data[i].orig_arrival_time + "</span><br><br></li>");
			i++;
        }
    });
}

function StartApp(){
  if (DoesCookieExist()){
    GetSchedule();
    ShowTimes();
    GetLines();
  }
  else{
    GetLines();
    ShowSettings();
  }
}