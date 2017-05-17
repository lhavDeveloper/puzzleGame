 /*
 * This javascript files contains all the javascript for geolocation.js to work
 */

 /*
 * This function is called on page load and sets up geolocation.
 * It retrieves the latitude and longitude value of the user.
 */
 function init() {

   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(displayLocationData);
   } else {
     document.body.innerHTML = "Geolocation is not supported by this browser.";
   }
 }

 /*
 * The following function displays the address of the user
 * It also calls the function to initialise the google map to diaplay user's location
 */
 function displayLocationData(position) {

   var latitudeElement = document.getElementById('userLatitude');
   var longitudeElement = document.getElementById('userLongitude');
   //following variables store the latitude and longitude of user's location
   var latitude = parseFloat(position.coords.latitude);
   var longitude = parseFloat(position.coords.longitude);

   //the following code gets address of the user using Google Maps' geocode.
   var latlng = new google.maps.LatLng(latitude, longitude);
   var geocoder = new google.maps.Geocoder();
   geocoder.geocode({
     'latLng': latlng
   }, function(results, status) {
     console.log(results)
     if (status == google.maps.GeocoderStatus.OK) {
       document.getElementById('userAddress').innerHTML = results[0].formatted_address;

     }
   });

   latitudeElement.innerHTML = latitude;
   longitudeElement.innerHTML = longitude;
   initMap(latitude, longitude);
 }

 /*
  * The following function calls the Google Maps API and displays the map
  * inputs : 1) latitude : The latitude of the location to the marked in the map
             2) longitude : The longitude of the location to the marked in the map
 */
 function initMap(latitude, longitude) {
   var locationPoint = {
     lat: latitude,
     lng: longitude
   };
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 13,
     center: locationPoint
   });
   var marker = new google.maps.Marker({
     position: locationPoint,
     map: map
   });
 }