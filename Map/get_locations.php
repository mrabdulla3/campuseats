<?php
header('Content-Type: application/json'); // Return JSON response

include 'config.php'; // Include your database connection

// Get the delivery boy ID from the query string
$delivery_boy_id = $_GET['delivery_boy_id'] ?? null;

if (!$delivery_boy_id) {
    echo json_encode(['status' => 'error', 'message' => 'Delivery Boy ID is required']);
    exit;
}

try {
    // Fetch the customer's location
    $query = "SELECT latitude AS customer_latitude, longitude AS customer_longitude 
              FROM customer_locations 
              WHERE customer_id = (SELECT customer_id FROM orders WHERE delivery_boy_id = $delivery_boy_id LIMIT 1)";
    $customerResult = mysqli_query($conn, $query);
    $customerLocation = mysqli_fetch_assoc($customerResult);

    // Fetch the delivery boy's location
    $query = "SELECT latitude AS delivery_latitude, longitude AS delivery_longitude 
              FROM delivery_boy_locations 
              WHERE delivery_boy_id = $delivery_boy_id";
    $deliveryResult = mysqli_query($conn, $query);
    $deliveryBoyLocation = mysqli_fetch_assoc($deliveryResult);

    if ($customerLocation && $deliveryBoyLocation) {
        echo json_encode([
            'status' => 'success',
            'customer_location' => $customerLocation,
            'delivery_boy_location' => $deliveryBoyLocation,
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Location not found']);
    }

    // Free result sets
    if ($customerResult) mysqli_free_result($customerResult);
    if ($deliveryResult) mysqli_free_result($deliveryResult);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
