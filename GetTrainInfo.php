<?php
/* Plugin Name: Phila Pay Widget
Plugin URI: localhost/wordpress
Description: Displays Payment Options
Version: 1.0
Author: Andrew Kennel
Author URI: localhost/wordpress
*/
add_shortcode('PhilaPay', 'philapay_handler');

function philapay_handler(){
    $message = <<<EOM
	
	<!DOCTYPE HTML>
    <head>

		<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
        <script src="GetTrainInfo.js"></script>

        <link rel="stylesheet" href="style.css" />
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

function philapaywidget($args, $instance) { // widget sidebar output
  extract($args, EXTR_SKIP);
  echo $before_widget; // pre-widget code from theme
  echo philapay_handler();
  echo $after_widget; // post-widget code from theme
}
?>