<?php
$id = 0;
$cout = 0;
if (isset($_POST["sub"]) && $_POST["fel"] != null) {
  include 'config.php';
  $idt = $_POST['fel'];
  $sql = "SELECT * FROM orders WHERE order_id=$idt";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $id = $row["delivery_boy_id"];
    $cout = 1;
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customer - Track Delivery Boy</title>
  <link href="style.css" rel="stylesheet">
  <script src="https://apis.mapmyindia.com/advancedmaps/v1/<API>/map_load?v=1.5"></script>
  <!-- MapMyIndia API Key -->
  <script>
    let map;
    let deliveryBoyMarker;
    let customerMarker;

    function initMap() {
      // Default center (change as needed)
      map = new MapmyIndia.Map("map", {
        center: [28.6139, 77.2090], // Default center for the map (Delhi)
        zoom: 20,
      });
      updateMarkers();
      setInterval(updateMarkers, 1000);
    }

    function updateMarkers() {
      fetch('/get_locations.php?delivery_boy_id=<?php echo $id; ?>') // Replace with your actual endpoint
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            const customerLocation = data.customer_location;
            const deliveryBoyLocation = data.delivery_boy_location;

            // Update or add customer marker
            if (!customerMarker) {
              customerMarker = new L.Marker([customerLocation.customer_latitude, customerLocation.customer_longitude]); // Use L.Marker (lowercase "L")
              customerMarker.addTo(map);
              customerMarker.bindPopup("Customer Location").openPopup();
            } else {
              customerMarker.setLatLng([customerLocation.customer_latitude, customerLocation.customer_longitude]);
            }

            // Update or add delivery boy marker
            if (!deliveryBoyMarker) {
              deliveryBoyMarker = new L.Marker([deliveryBoyLocation.delivery_latitude, deliveryBoyLocation.delivery_longitude]); // Use L.Marker (lowercase "L")
              deliveryBoyMarker.addTo(map);
              deliveryBoyMarker.bindPopup("Delivery Boy's Location").openPopup();
            } else {
              deliveryBoyMarker.setLatLng([deliveryBoyLocation.delivery_latitude, deliveryBoyLocation.delivery_longitude]);
            }
          } else {
            console.log(data.message);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  </script>
</head>

<body onload="initMap()">
  <h1>Track Your Delivery</h1>
  <form method="POST">
    <input type="number" name="fel" placeholder="Enter the order ID:" required>
    <button type="submit" name="sub" value="Map">Map</button>
  </form>
  <div id="war"></div>
  <div id="map" style="width: 100%; height: 500px;"></div> <!-- Map container -->

  <?php
  if (($cout == 0 && isset($_POST["sub"])) || (isset($_POST["sub"]) && $_POST["fel"] == null)) {
    echo "<script>document.getElementById('war').innerHTML='Not found?'</script>";
  }
  ?>
</body>

</html>