<?php
// Database configuration
$host = 'localhost';        // Database host
$dbname = 'food_delivery';  // Database name
$username = 'root';         // Database username
$password = '';             // Database password (leave blank if none)

// Create a MySQLi connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check the connection
if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . mysqli_connect_error()]));
}

// Uncomment for debugging purposes (optional)
// echo "Connected successfully!";
?>
