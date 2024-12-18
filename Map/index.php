<?php
$type=$_GET['type'] ?? null;
$id=$_GET['id'] ?? null;
if(!$type || !$id){
    echo "URL incorrect";
    exit;
}
if($type== 1){
    header("Location: customer_tracking.php/?id=$id");
    exit;
}
else if($type== 2){
    header("Location: delivery_boy_tracking.php/?id=$id");
    exit;
}
else{
    echo "404 error";
    exit;
}
?>