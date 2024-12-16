<?php
// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the necessary data is present
if (!isset($data['delivery_boy_id']) || !isset($data['latitude']) || !isset($data['longitude'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    exit();
}

$delivery_boy_id = $data['delivery_boy_id'];
$latitude = $data['latitude'];
$longitude = $data['longitude'];

include 'config.php';

// Prepare the SQL statement to update the delivery boy's location
$sql = "UPDATE delivery_boy_locations SET latitude = ?, longitude = ? WHERE delivery_boy_id = ?";

$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    // Bind the parameters
    mysqli_stmt_bind_param($stmt, 'ssi', $latitude, $longitude, $delivery_boy_id);

    // Execute the statement
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update location']);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare the SQL statement']);
}

// Close the connection
mysqli_close($conn);
?>
