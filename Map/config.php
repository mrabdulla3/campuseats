<?php
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

    // Uncomment for debugging purposes (optional)
    // echo "Connected successfully!";
} catch (PDOException $e) {
    // Display error message if connection fails
    echo "Database connection failed: " . $e->getMessage();
    exit;
}
?>
