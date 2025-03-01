<?php

require_once("config/database.php");

$idCategory = $_POST['idCategoria'];
$nombre = $_POST['nombreCategoria'];
$color = $_POST['colorCategoria'];

try {
    if (empty($idCategory) || empty($nombre) || empty($color)) {
        echo json_encode(array('status' => 'empty', 'message' => 'datos vacios'));
    } else {
        $sql = "UPDATE categorias SET nombre='$nombre', color=
'$color' WHERE id_categoria=$idCategory";


        $query = mysqli_query($connection, $sql);
        if (!$query) {
            throw new Exception(mysqli_error($connection));
        } else {
            echo json_encode([
                "status" => "success",
                "message" => "Categoria actualizada con exito"
            ]);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}