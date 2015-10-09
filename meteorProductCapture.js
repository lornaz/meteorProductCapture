function onDeviceReady() {
  // As an example, you now have the device name, Cordova version, etc. available
  alert('Device Cordova: ' + device.cordova);
  
  	cordova.plugins.barcodeScanner.scan(
	function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
            if (!result.cancelled) {
		      	 Session.set("barcode", result.text);
		      	 }
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }

	   );
 
	 document.removeEventListener("deviceready", onDeviceReady, false);
}


if (Meteor.isCordova) {
  //barcode scanner code

  Template.scanBarcode.helpers({
    barcode: function () {
      return Session.get("barcode");
    }
  });

  Template.scanBarcode.events({
    'click button': function () {
    // scanner is not calling me back. I am getting called back to the ondeviceready
  	cordova.plugins.barcodeScanner.scan(
	function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
            if (!result.cancelled) {
		      	 Session.set("barcode", result.text);
		      	 }
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }

	   );     
    }
   });
  
}

if (Meteor.isClient) {
  

  Meteor.startup(function () {
    // code to run on client at startup
    // Wait for Cordova to load and run barcode scanner once to see it works from start-up. 
	//document.addEventListener("deviceready", onDeviceReady, false);
		
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
