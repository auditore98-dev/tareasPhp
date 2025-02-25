<?php

require_once("config/database.php");

$idTarea=$_POST["idTarea"];
$sql="DELETE FROM tareas WHERE id_tarea=$idTarea";


try{
    $query=mysqli_query($connection,$sql);
    if($query){
        echo json_encode([
            "status"=> "success"
        ]);
    }else{
        throw new Exception(mysqli_error($connection));
    }
    
}catch(Exception $e){
    echo json_encode([
        "status"=>"error",
        "message"=>$e->getMessage()
    ]);
}