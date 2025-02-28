<?php

require_once("config/database.php");
try {
    $categoriaName = $_POST["categoriaNombre"];
    $color = $_POST["color"];

    if (empty($categoriaName) && empty($color)) {
        echo json_encode([
            "status" => "empty",
            "message" => "datos enviados vacios"
        ]);
    } else {
        $sql = "INSERT INTO categorias(nombre,color) VALUES('$categoriaName','$color');";
        $query = mysqli_query($connection, $sql);
        $data = [];
        if (!$query) {
            throw new Exception(mysqli_error($connection));
        } else {
            echo json_encode([
                "status" => "success"
            ]);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}