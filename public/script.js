let $card = $('#card');
let $long_url = $('#long-url');
let $short_url = $('#short-url');


//jQuery working, wohooo
$(document).ready(function() {

$card.hide();
$card.css("visibility", "visible");

	$( "#url_form" ).submit(function( event ) {
		event.preventDefault();
		$card.fadeTo(0, 0);

		let origin = window.location.origin;

		let urlValue = $('#input-shorten').val();
		let urlAPI = `${origin}/new/${urlValue}`;
		//let urlAPI = "http://localhost:5000/new/" + urlValue;

		$.getJSON(urlAPI)
		  .done(function(data) {
	    	console.log(data);

	    	let original = data.original_url,
	    			short = data.short_url;

	    	//If it is not an URL
	    	if (original === undefined || short === undefined) {
	    		$card.hide();
	    		console.error(data.error);
	    		alert(data.error);
	    	} else {
	    		$card.show();
		    	$long_url.text(original);
		    	$long_url.attr("href", getHttp(original));
		    	$short_url.text(short);
		    	$short_url.attr("href", short);

		    	$card.fadeTo("slow", 1);

		    	$('.copy-chip').click(function() {
		    		copyToClipboard($('#short-url'));
		    	});
	    	}

			})
			.fail(function() {
				console.log("Could not get information from the server");
			}); //close .getJSON.done
	}); // .submit
}); //close .ready

// HELPER FUNCTIONS

function copyToClipboard(element) {
  let $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function getHttp(url) {
	let httpRegex = /http(s)?:\/\//;
	// if http:// is not part of the url, add http:// to the beginning
	return !(httpRegex.test(url)) ? ('http://' + url) : (url);
}
