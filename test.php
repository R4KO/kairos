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
    <a href="index.html"><img id="bann" src="img/banniere.png" alt="Bannière Institut Europpéen de Synergologie"></a>

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




for($i=0; $i<sizeof($str);$i++){
   if ($str[$i] == ".."){
        $str[$i] = " IS NULL";
    }else {
       $str[$i] = "= '".$str[$i]."'";
   }
}


$zone1 = $str[0];
$zone2 = $str[1];
$zone3 = $str[2];
$zoneP = $str[3];


$sql = "Select c.Codification ,Horizon_de_sens from classification_synergologie c join def d on c.Codification = d.Codification where Typedegeste = '".$action."' and  ZoneCorps1 ".$zone1." and ZoneCorps2 ".$zone2." and ZoneCorps3 ".$zone3." and Centre_Droite_Gauche ".$zoneP." ";
if (!mysqli_query($conn, $sql)) {
    echo "<script>alert('f')</script>";
    die("Error : " . mysqli_error($conn));
}


?>


<table>
    <tr>
        <th>
            <label>Codification:</label>
        </th>
        <th>
            <label>Définition:</label>
        </th>
    </tr>


                <?php
                $result = mysqli_query($conn, $sql);
                while ($rows2 = mysqli_fetch_array($result))
                {
                    if(sizeof($rows2)==0){
                        echo "<script> window.location.history(-1) ;</script>";
                    }
                    echo "  <tr> <td> <label>";
                    echo $rows2['Codification'];
                    echo "</br></label></td>";
                    echo "<td> <label>";
                    $str2 = explode('_',$rows2['Codification']);
                    $maX = sizeof($str2)-1;
                        if (isset($str2[$maX])){
                            if ( $str2[$maX] == 56){
                                echo" Avec la main droite : <br>";
                            }else if ( $str2[$maX] == 66){
                                echo" Avec la main gauche : <br>";
                            }else if ( $str2[$maX] == 5666){
                                echo" Avec les deux mains : <br>";
                            }

                        }


                    echo $rows2['Horizon_de_sens'];

                    echo "</br></label></td>";
                    echo"</tr>";
                }
                ?>
</table>
<div id="boutton">
<a href="index.html"><button class="button" > Retour </button></a>
</div>
</body>


</html>