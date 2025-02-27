<?php
require_once("config/database.php");

$sql="SELECT id_tarea,nombre_tarea,nombre,color
FROM tareas INNER JOIN categorias ON
tareas.categorias_id_categoria=categorias.id_categoria";


$query=mysqli_query($connection,$sql);

$data=[];

while($result=mysqli_fetch_assoc($query)){
    $data[]=$result;
}

echo json_encode($data);