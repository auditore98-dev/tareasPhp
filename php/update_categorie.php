<?php

require_once("config/database.php");

$idCategory=$_POST['idCategory'];
$nombre=$_POST['nombreCategory'];
$color=$_POST['colorCategory'];

$sql="UPDATE categorias SET nombre='$nombre', color=
'$color' WHERE id_categoria=$idCategory";

try{
   $query=mysqli_query($connection,$sql);
   if(!$query){
    throw new Exception(mysqli_error($connection));
   }else{
    echo json_encode([
        "status"=> "success",
        "message"=>"Categoria actualizada con exito"
    ]);
   }
}catch(Exception $e){
    echo json_encode([
        "status"=> "error",
        "message"=> $e->getMessage()
    ]);
}