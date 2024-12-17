<?php
// Database configuration
$host = 'sql12.freesqldatabase.com';        // Database host
$dbname = 'sql12752618';  // Database name
$username = 'sql12752618';         // Database username
$password = '7hS1lbmBYp';             // Database password (leave blank if none)

// Create a MySQLi connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check the connection
if (!$conn) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . mysqli_connect_error()]));
}

// Uncomment for debugging purposes (optional)
// echo "Connected successfully!";
?>
