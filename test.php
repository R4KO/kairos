<?php

$conn = mysqli_connect("localhost", "root", "", "synergologie");
//check connection
if (mysqli_connect_errno()) {
    echo "Failed to Connect to MySQL:" . mysqli_connect_error();
}


$action = $_GET['action'];
$test = $_GET['test'];
$sql = "Select Codification from classification_synergologie where Typedegeste = '".$action."' and  ZoneCorps1 = ".$test." ";
if (!mysqli_query($conn, $sql)) {
    echo "<script>alert('f')</script>";
    die("Error : " . mysqli_error($conn));
}
$result = mysqli_query($conn, $sql);
while($rows = mysqli_fetch_array($result)) {
    echo $rows['Codification'];
    echo  "</br>";
}
