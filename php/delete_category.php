<?php
require_once("config/database.php");
try {
    $idCategory = $_POST["idCategoria"];

    if (empty($idCategory)) {
        echo json_encode([
            "status" => "empty",
            "message" => "no se envio ningun dato"
        ]);
    } else {
        $select = "SELECT *FROM categorias WHERE id_categoria=$idCategory";
        if (mysqli_num_rows(mysqli_query($connection, $select)) > 0) {
            $sql = "DELETE FROM categorias WHERE id_categoria=$idCategory";
            $query = mysqli_query($connection, $sql);
            if (!$query) {
                throw new Exception(mysqli_error($connection));
            } else {
                echo json_encode([
                    "status" => "success",
                    "message" => "Categoria eliminada correctamente"
                ]);
            }
        } else {
            echo json_encode([
                "status" => "not found",
                "messagge" => "Categoria no encontrada"
            ]);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
