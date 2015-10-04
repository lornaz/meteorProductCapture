function onDeviceReady() {
  // As an example, you now have the device name, Cordova version, etc. available
  alert('Device Cordova: ' + device.cordova);
  // Now call one of your barcode functions, etc.
}


if (Meteor.isClient) {
  

  Meteor.startup(function () {
    // code to run on client at startup
    // Wait for Cordova to load
	document.addEventListener("deviceready", onDeviceReady, false);
	

  });
  
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


  
//Photo capture code
  Template.takePackagePhoto.helpers({
    photo1: function () {
      return Session.get("photo1");
    }
  });

 Template.takePackagePhoto.events({
    'click button': function(event, template) {
        var cameraOptions = {
            width: 600,
            height: 600
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               Session.set("photo1", data);
           }
        });
        event.preventDefault();
    }
});

 Template.takeIngredientsPhoto.helpers({
    photo2: function () {
      return Session.get("photo2");
    }
  });

 Template.takeIngredientsPhoto.events({
    'click button': function(event, template) {
        var cameraOptions = {
            width: 600,
            height: 600
        };
        MeteorCamera.getPicture(cameraOptions, function (error, data) {
           if (!error) {
               Session.set("photo2", data);
           }
        });
        event.preventDefault();
    }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
