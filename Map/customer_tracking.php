<?php
$caster_id = $_GET['id'] ?? null;
$idt = 0;
$cout = 0;
$de_boy_id=0;
if (isset($_GET["sub"]) && $_GET["fel"] != null) {
  include 'config.php';
  $idt = $_GET['fel'];
  $sql = "SELECT delivery_boy_id FROM orders WHERE user_id='$caster_id' AND id='$idt'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
     $row = mysqli_fetch_array($result);
     $de_boy_id = $row["delivery_boy_id"];
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
  <link href="../style.css" rel="stylesheet">
  <script src="https://apis.mapmyindia.com/advancedmaps/v1/62b180d89452f2b3f398d6d794c7e872/map_load?v=1.5"></script>
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
      fetch('/get_locations.php?ord_id=<?php echo $idt;?>&deli_boy=<?php echo $de_boy_id;?>') // Replace with your actual endpoint
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
  <form method="GET">
    <input type="hidden" name="id" value="<?php echo $caster_id?>">
    <input type="number" name="fel" placeholder="Enter the order ID:" required>
    <button type="submit" name="sub" value="Map">Map</button>
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