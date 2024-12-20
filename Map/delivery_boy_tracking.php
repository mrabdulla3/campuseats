<?php
$de_boy_id = $_GET['id'] ?? null;
$cout = 0;
$idt = 0;
$caster_id = 0;
if (isset($_GET["sub"]) && $_GET["fel"] != null) {
  include 'config.php';
  $idt = $_GET['fel'];
  $sql = "SELECT * FROM orders WHERE delivery_boy_id='$de_boy_id' AND id='$idt'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_array($result);
    $caster_id = $row["user_id"];
    $cout = 1;
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track Customer</title>
  <link href="../style.css" rel="stylesheet">
  <script src="https://apis.mapmyindia.com/advancedmaps/v1/62b180d89452f2b3f398d6d794c7e872/map_load?v=1.5"></script>
  <script>
    let map;
    let customerMarker;
    let deliveryBoyMarker;

    function initMap() {
      // Initialize the map with a default center (Delhi)
      map = new MapmyIndia.Map("map", {
        center: [28.6139, 77.2090],
        zoom: 20, // Adjust zoom level as needed
      });

      // Initial fetch to get the customer and delivery boy location
      fetchDeliveryBoyAndCustomerLocation();

      // Set up continuous polling for delivery boy's location (every 5 seconds)
      setInterval(fetchDeliveryBoyAndCustomerLocation, 1000);
    }

    // Fetch both the delivery boy and customer locations
    function fetchDeliveryBoyAndCustomerLocation() {
      fetch('/get_locations.php?ord_id=<?php echo $idt; ?>&deli_boy=<?php echo $de_boy_id; ?>') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            const customerLocation = data.customer_location;
            const deliveryBoyLocation = data.delivery_boy_location;

            // Add or update customer marker
            if (!customerMarker) {
              customerMarker = new L.Marker([customerLocation.customer_latitude, customerLocation.customer_longitude]); // Use L.Marker (lowercase "L")
              customerMarker.addTo(map);
              customerMarker.bindPopup("Customer Location").openPopup();
              
            } else {
              customerMarker.setPosition([customerLocation.customer_latitude, customerLocation.customer_longitude]);
            }

            // Add or update delivery boy marker
            if (!deliveryBoyMarker) {
              deliveryBoyMarker = new L.Marker([deliveryBoyLocation.delivery_latitude, deliveryBoyLocation.delivery_longitude]); // Use L.Marker (lowercase "L")
              deliveryBoyMarker.addTo(map);
              deliveryBoyMarker.bindPopup("Delivery Boy's Location").openPopup();
              
            } else {
              deliveryBoyMarker.setPosition([deliveryBoyLocation.delivery_latitude, deliveryBoyLocation.delivery_longitude]);
            }
            updateDeliveryBoyLocation();
            // Show or update the route between the delivery boy and the customer
          } else {
            console.log(data.message);
          }
        })
        .catch(error => console.error("Error fetching locations:", error));
    }
    function updateDeliveryBoyLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
      }

      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update delivery boy marker on the map
            if (deliveryBoyMarker) {
              deliveryBoyMarker.setLatLng([latitude, longitude]);
            } else {
              deliveryBoyMarker = new L.Marker([latitude, longitude]);
              deliveryBoyMarker.addTo(map);
              deliveryBoyMarker.bindPopup("Your Location").openPopup();
            }

            // Send updated coordinates to the server
            fetch('/update_location.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                delivery_boy_id: <?php echo $de_boy_id; ?>,
                latitude: latitude,
                longitude: longitude
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.status !== 'success') {
                  console.error('Failed to update location on the server:', data.message);
                }
              })
              .catch(error => console.error("Error updating location:", error));
          },
          function (error) {
            console.error("Geolocation error:", error.message);
          },
          { enableHighAccuracy: true } // High accuracy for precise location
        );
      }, 1000); // Poll every 5 seconds
    }

  </script>
</head>

<body onload="initMap()">
  <h1>Track Customer</h1>
  <form method="GET">
    <input type="hidden" name="id" value="<?php echo $de_boy_id ?>">
    <input type="number" name="fel" placeholder="Enter the order ID:" required>
    <button type="submit" name="sub">Map</button>
  </form>
  <div id="war"></div>
  <div id="map" style="width: 100%; height: 500px;"></div> <!-- Map container -->

  <?php
  if (($cout == 0 && isset($_GET["sub"])) || (isset($_GET["sub"]) && $_GET["fel"] == null)) {
    echo "<script>document.getElementById('war').innerHTML='Not found?'</script>";
  }
  ?>
</body>

</html>