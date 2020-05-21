<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Analysez les comportements rencontrés</title>
    <link rel="stylesheet" type="text/css" href="style/index.css">
    <link rel="stylesheet" type="text/css" href="style/test.css">

</head>

<body>
<header>
    <a href="file:///Users/Maxime/Desktop/kairos/index.html"><img id="bann" src="img/banniere.png" alt="Bannière Institut Europpéen de Synergologie"></a>

</header>

<br>
<div id="outil">
    <p> Comment utiliser l'outil? Vous avez assisté à un geste de votre interlocuteur et vous voulez connaître sa signification? Selectionnez le type de puis la zone du geste où le geste a été effectué. Vous en apprendrez plus sur sa signification</p>
</div>

<?php

$conn = mysqli_connect("localhost", "root", "", "synergologie");
//check connection
if (mysqli_connect_errno()) {
    echo "Failed to Connect to MySQL:" . mysqli_connect_error();
}


$action = $_GET['action'];
$test = $_GET['test'];

$str = explode("_",$test);
print_r( explode("_",$test));



for($i=0; $i<sizeof($str);$i++){
   if ($str[$i] == ".."){
        $str[$i] = " IS NULL";

        echo "normalement cette valeur est nulle".$str[$i]."<br>";
    }else {
       $str[$i] = "= '".$str[$i]."'";
   }
}
print_r($str);

$zone1 = $str[0];
$zone2 = $str[1];
$zone3 = $str[2];
$zoneP = $str[3];


$sql = "Select c.Codification ,Horizon_de_sens from classification_synergologie c join def d on c.Codification = d.Codification where Typedegeste = '".$action."' and  ZoneCorps1 ".$zone1." and ZoneCorps2 ".$zone2." and ZoneCorps3 ".$zone3." and Centre_Droite_Gauche ".$zoneP." ";
if (!mysqli_query($conn, $sql)) {
    echo "<script>alert('f')</script>";
    die("Error : " . mysqli_error($conn));
}

$result = mysqli_query($conn, $sql);
while ($rows = mysqli_fetch_array($result)){
    echo $rows['Codification']."   ".$rows["Horizon_de_sens"]." <br>";
}

?>


<table>
    <tr>
        <td>
            <label>Codification :</label>
        </td>
        <td>
            <label>
                <?php
                while ($rows2 = mysqli_fetch_array($result))
                {
                    echo $rows2['Codification'];
                    echo "</br>";
                }
                ?>
            </label>
        </td>
        <td>
            <label>Définition :</label>
        </td>
        <td>
            <label>
                <?php
                while ($rows2 = mysqli_fetch_array($result))
                {
                    echo $rows2['Horizon_de_sens'];
                    echo "</br>";
                }
                ?>
            </label>
        </td>
    </tr>
</table>

</body>

<script type="text/javascript" src="script/zoom.js"></script>
<script type="text/javascript" src="script/script.js"></script>
<script type="text/javascript" src="script/convert.js"></script>

</html>