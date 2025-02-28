<?php
$idCategory = $_POST["idCategoria"];

try {
    if (empty($idCategory)) {
        echo json_encode(array(
            "status" => "empty",
            "message" => "categoria no encontrada"
        ));
    } else {
        $sql = "DELETE FROM categorias WHERE id_categoria=$idCategory";
        $query = mysqli_query($connection, $sql);
        if (!$query) {
            throw new Exception(mysqli_error($connection));
        } else {
            echo json_encode(["status" => "success"]);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
