<?php

require_once("config/database.php");
try {
$nombre = $_POST["nombreTarea"];
$categoriaId = $_POST["categoriaId"];

if(empty($nombre) && empty($categoriaId)){
    echo json_encode(["status"=>"empty","message"=> "datos enviados vacios"]);
}else{
    $sql = "INSERT INTO tareas(nombre_tarea,categorias_id_categoria)
VALUES('$nombre',$categoriaId)";



    $query = mysqli_query($connection, $sql);
    if ($query) {
        echo json_encode([
            "status"=>"success"
        ]);
    }else{
        throw new Exception("Error al insertar datos"
        .mysqli_error($connection));
    }
}


}catch(Exception $e){
    echo json_encode([
      "status"=>"error",
      "message"=>$e->getMessage()
    ]);
}
