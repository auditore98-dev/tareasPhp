<?php
require_once("config/database.php");

$idTarea=$_POST["idTarea"];
$nombre=$_POST["nombreTarea"];
$categoria=$_POST["categoriaId"];


$sql="UPDATE tareas SET nombre_tarea='$nombre',
categorias_id_categoria=$categoria WHERE id_tarea=$idTarea";


try{
    $query=mysqli_query($connection,$sql);
    if($query){
        echo json_encode([
            "status"=>"success"
        ]);
    
    }else{
        throw new Exception(mysqli_error($connection));
    }
}catch(Exception $e){
    echo json_encode($e->getMessage());
}
