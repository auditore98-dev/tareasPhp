<?php

$hostname="localhost";
$user="root";
$password="12345";
$bd="tareas";


try{
    $connection=mysqli_connect($hostname,$user,$password,$bd);

    if(!$connection){
        throw new Exception("No se pudo conectar a la base de datos");
    }
}catch(Exception $e){
    echo "Error en la ejecucion ".$e->getMessage();
}



