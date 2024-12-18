<?php
header('Content-Type: application/json'); // Return JSON response

include 'config.php'; // Include your database connection

// Get the delivery boy ID from the query string
$delivery_boy_id = $_GET['deli_boy'] ?? null;
$order_id = $_GET['ord_id'] ?? null;


if (!$delivery_boy_id || !$order_id) {
    echo json_encode(['status' => 'error', 'message' => 'Delivery Boy ID is required']);
    exit;
}

try {
    // Fetch the customer's location
    $query = "SELECT customer_latitude,customer_longitude 
              FROM orders 
              WHERE id = $order_id";
    $customerResult = mysqli_query($conn, $query);
    $customerLocation = mysqli_fetch_assoc($customerResult);

    // Fetch the delivery boy's location
    $query = "SELECT delivery_latitude, delivery_longitude 
              FROM delivery_boy
              WHERE id = $delivery_boy_id";
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
