(function () {

    // google map
    function initMap() {
        var location = {lat: -25.344, lng: 131.036};
        var map = new google.maps.Map(document.querySelector('.map'), {zoom: 4, center: location});
        var marker = new google.maps.Marker({position: location, map: map});
    }

    initMap();

})();