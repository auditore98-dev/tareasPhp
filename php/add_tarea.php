<?php

require_once("config/database.php");

$nombre = $_POST["nombreTarea"];
$categoriaId = $_POST["categoriaId"];

$sql = "INSERT INTO tareas(nombre_tarea,categorias_id_categoria)
VALUES('$nombre',$categoriaId)";


try {
    $query = mysqli_query($connection, $sql);
    if ($query) {
        echo json_encode([
            "status"=>"success"
        ]);
    }else{
        throw new Exception("Error al insertar datos"
        .mysqli_error($connection));
    }
}catch(Exception $e){
    echo json_encode([
      "status"=>"error",
      "message"=>$e->getMessage()
    ]);
}
