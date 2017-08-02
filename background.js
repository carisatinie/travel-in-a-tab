var total = 0;

	// post message
	var port = chrome.runtime.connect({name: "content"});
	if (port) {
		port.postMessage({total_distance : total});
	}

	// listen for total
	chrome.runtime.onConnect.addListener(function(port) {
		port.onMessage.addListener(function(msg) {
			total += msg.total_distance;
		});
		return true;
	});


window.addEventListener("scroll", function(e){

	if (typeof total_distance === "undefined") { // absolute value
		var previousOffsetX = Math.abs(document.body.scrollLeft);
		var previousOffsetY = Math.abs(document.body.scrollTop);
		total = previousOffsetX + previousOffsetY;
	}
	else {
		// var total_distance = 0;
		chrome.storage.sync.get('total_distance', function(result) {
			total = result.total_distance;
			console.log("storage : " + total);
		});
	}

		var scrollLeft = Math.abs(document.body.scrollLeft);
		var scrollTop = Math.abs(document.body.scrollTop);

		previousOffsetX += scrollLeft;
		previousOffsetY += scrollTop;

		total += (previousOffsetX + previousOffsetY);

		chrome.storage.sync.set({'distance': total}, function() {
			console.log("total distance: " + total);
		});
		
});




	


