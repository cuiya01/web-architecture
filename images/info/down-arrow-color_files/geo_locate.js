/* 

	Script to include server side IP based geo location
	Server side component (freegeoip) hosted by Cloud.IQ
	Functions in IE8+ and all major browsers
	
	Based on postmessage.  Creates a remote iframe from the server containing the following script tag:
	
	<script type="text/javascript">
		window.onload = function() {  
			parent.postMessage('[The generated location JSON]','[The calling domain]');
		}
	</script>
	
	Usage: 
	
	cloudiq_geo_locator.init(function(){
	
		console.log(cloudiq_geo_locator.get_country_code());
	});
	
	James Donnelly
	22/01/15

	Updated code so the origin matches 'cloud-iq.com'. This was done so we do not clash with other services which use post message.
	
	Sakib Rahman
	10/07/15
	
	Updated code so that the data does not match messages coming from the overlay.
	
	Sakib Rahman
	18/08/15
	
	Added get_country_name function to return the country name
	
	Sakib Rahman
	09/09/15

	Add a function to create a element to detect when the code has been injected
	
	Sakib Rahman
	05/10/2017
*/

window.cloudiq_geo_locator = (function() {
		
	var location_data;
	var geo_location_server = "https://platform.cloud-iq.com/?do=geo_ip";
	var init = function(callback){
		var callback = callback;
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
		
		eventer(messageEvent,function(e) {
			if(e.origin.match('cloud-iq.com') && !e.data.match(/overlay|process_email|close_button|handle_redirect/ig)){
				var location_json = e.data;
				
				location_data = JSON.parse(location_json);
				
				callback();
			}
		},false);
		
		var geo_iframe = document.createElement("IFRAME");
		geo_iframe.setAttribute("src", geo_location_server);
		geo_iframe.setAttribute("style", "display:none");
		geo_iframe.id = "cloudiqGeoIframe";
		document.getElementsByTagName('body')[0].appendChild(geo_iframe);
	}
	
	var get_country_code = function(){
		return location_data.country_code;	
	}
	
	var get_country_name = function(){
		return location_data.country_name;
	}

	return {
		init: init,
		get_country_code: get_country_code,
		get_country_name: get_country_name
	};
	
}());


var cloudiq_geo_locate_pixel=document.createElement('img');
cloudiq_geo_locate_pixel.setAttribute('id', 'cloudiq_geo_pixel');
cloudiq_geo_locate_pixel.setAttribute('style', 'display:none;');
document.getElementsByTagName('head')[0].appendChild(cloudiq_geo_locate_pixel);

