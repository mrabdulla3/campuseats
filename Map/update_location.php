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

// Database configuration
$host = 'localhost';        // Database host
$dbname = 'food_delivery';  // Database name
$username = 'root';         // Database username
$password = '';             // Database password (leave blank if none)

try {
    // Create a new PDO connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    // Set PDO error mode to exception for better error handling
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare the SQL statement to update the delivery boy's location
    $sql = "UPDATE delivery_boy_locations SET latitude = :latitude, longitude = :longitude WHERE delivery_boy_id = :delivery_boy_id";
    $stmt = $conn->prepare($sql);

    // Bind the parameters
    $stmt->bindParam(':latitude', $latitude, PDO::PARAM_STR);
    $stmt->bindParam(':longitude', $longitude, PDO::PARAM_STR);
    $stmt->bindParam(':delivery_boy_id', $delivery_boy_id, PDO::PARAM_INT);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update location']);
    }
} catch (PDOException $e) {
    // Catch and display any PDO errors
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
