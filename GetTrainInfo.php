<?php
/* Plugin Name: Get Train Info
Plugin URI: http://turtlemafia.org
Description: Displays Train status for East Falls SEPTA Trains.
Version: 1.0
Author: Andrew Kennel
Author URI: http://turtlemafia.org
*/
add_shortcode('Train', 'train_handler');

function train_handler(){
    $message = <<<EOM
	
	<!DOCTYPE HTML>
    <head>

		<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/cookies.js"></script>
        <script src="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/GetTrainInfo.js"></script>

        <link rel="stylesheet" href="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/style.css" />
        <title>East Falls Train Schedule</title>
        
        <title>East Falls Train Schedule</title>
            
        <script type="text/javascript">
          $(document).ready(function () {

            StartApp();

          });
              
        </script>
            
      </head>
      <body>
        <div id = "Time" style="display:none;">
          <h2 id="Inbound">East Falls Inbound</h2>
          <ul id="Inbound-List">
          </ul>
          <h2 id="Outbound">Jefferson Outbound</h2>
          <ul id="Outbound-List">
          </ul>
          <div>
            <h3 id="Line"></h3>
            <img src = "http://turtlemafia.org/wp-content/plugins/GetTrainInfo/gear.jpg" id = "GearImage" onclick="ShowSettings()"></img>
          </div>
        </div>
        <div id = "Settings" style="display:none;">
          <div>
            <h2>Select your Line...</h2>
            <select id="LinesList" onchange="GetStationsForLine()"></select>
          </div>
          <div>
          <h2>Select your Home Station...</h2>
            <select id="HomeStationList"></select>
            <h2>Select your Work Station...</h2>
            <select id="WorkStationList"></select>
          </div>
          <div>
            <img id="SaveImage" onclick="SaveChanges()" src="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/save.jpg"></img>
            <img id="CancelImage" onclick="CancelChanges()" src="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/cancel.jpg"></img>
          </div>
        </div>
      </body>
	
EOM;

return $message;
}

function trainwidget($args, $instance) { // widget sidebar output
  extract($args, EXTR_SKIP);
  echo $before_widget; // pre-widget code from theme
  echo train_handler();
  echo $after_widget; // post-widget code from theme
}
?>