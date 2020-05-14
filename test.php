<?php

$con = mysqli_connect("localhost", "root", "", "pjt_transverse");
//check connection
if (mysqli_connect_errno()) {
    echo "Failed to Connect to MySQL:" . mysqli_connect_error();
}


$action = $_GET['action'];
$test = $_GET['test'];
//$sql = "Select * from classification_synergologie where  "
