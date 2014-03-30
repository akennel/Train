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
        <script src="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/GetTrainInfo.js"></script>

        <link rel="stylesheet" href="http://turtlemafia.org/wp-content/plugins/GetTrainInfo/style.css" />
        <title>East Falls Train Schedule</title>
        
        <script type="text/javascript">
            $(document).ready(function () {

                GetSchedule();

            });
        	
        </script>
        
    </head>
    <body>
        <h2 id="Inbound">East Falls Inbound</h2>
        <ul id="Inbound-List">
        </ul>
        <h2 id="Outbound">Market East Outbound</h2>
        <ul id="Outbound-List">
        </ul>
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