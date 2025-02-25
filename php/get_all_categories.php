<?php 

require_once("config/database.php");

$sql="SELECT *FROM categorias";


try{
    $query=mysqli_query($connection,$sql);

    if(!$query){
        throw new Exception(mysqli_error($connection));
    }else{
        if(mysqli_num_rows($query)> 0){
            while($result=mysqli_fetch_assoc($query)){
                $data[]=$result;
            }

            echo json_encode($data);
        }else{
            echo json_encode([
                "status"=> "empty",
                "message"=>"no hay registros que mostrar"
            ]);
        }
    }
}catch(Exception $e){
    echo json_encode([
        "error"=> $e->getMessage()
    ]);
}

