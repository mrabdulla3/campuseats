<?php
$id=0;
$cout=0;
if (isset($_POST["sub"]) && $_POST["fel"]!=null) {
  include 'config.php';
  $idt=$_POST['fel'];
  $sql = "SELECT * FROM orders WHERE order_id=$idt";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $id=$row["delivery_boy_id"];
    $cout=1;
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track Customer</title>
  <link href="style.css" rel="stylesheet">
  <script src="https://apis.mapmyindia.com/advancedmaps/v1/<API>/map_load?v=1.5"></script>
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
      setInterval(fetchDeliveryBoyAndCustomerLocation, 5000);
    }

    // Fetch both the delivery boy and customer locations
    function fetchDeliveryBoyAndCustomerLocation() {
      fetch('/get_locations.php?delivery_boy_id=<?php echo $id; ?>') // Replace with your API endpoint
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

<<<<<<< HEAD
              // Update the marker on the map
              deliveryBoyMarker.setLatLng([latitude, longitude]);

              // Send the new coordinates to the server to update in the database
              fetch('/update_location.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  delivery_boy_id: <?php echo $id; ?>, // Change to dynamic delivery boy ID
                  latitude: latitude,
                  longitude: longitude
                })
              })
                .then(response => response.json())
                .then(data => {
                  if (data.status !== 'success') {
                    console.error('Failed to update location');
                  }
                })
                .catch(error => console.error("Error:", error));
            },
            function (error) {
              console.error("Geolocation error:", error);
            }
          );
=======
        // Update delivery boy marker on the map
        if (deliveryBoyMarker) {
          deliveryBoyMarker.setLatLng([latitude, longitude]);
>>>>>>> 3c8d981d9c19ea90014b44fd293c1a8edf7b19a4
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
            delivery_boy_id: <?php echo $id; ?>,
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
  <form method="POST">
    <input type="number" name="fel" placeholder="Enter the order ID:" required>
    <button type="submit" name="sub">Map</button>
  </form>
  <div id="war"></div>
  <div id="map" style="width: 100%; height: 500px;"></div> <!-- Map container -->
  
  <?php
  if(($cout==0 && isset($_POST["sub"])) || (isset($_POST["sub"]) && $_POST["fel"]==null)){
    echo "<script>document.getElementById('war').innerHTML='Not found?'</script>";
  }
  ?>
</body>

</html>
