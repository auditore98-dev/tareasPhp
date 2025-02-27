<?php

require_once("config/database.php");

$idTarea = $_POST["idTarea"];
$sql = "SELECT *FROM tareas WHERE id_tarea=$idTarea";


try {
    $query = mysqli_query($connection, $sql);
    if (!$query) {  
        throw new Exception(mysqli_error($connection));
    } else {
        if (mysqli_num_rows($query) > 0) {
            $data=mysqli_fetch_assoc($query);
            echo json_encode([
                "status" => "success",
                "data" => $data
            ]);
        } else {
            echo json_encode(
                [
                    "status" => "empty",
                ]
            );
        }
    }
} catch (Exception $e) {
    echo json_encode([

        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
