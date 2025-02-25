const getAllTasks=()=>{
    fetch("php/get_all_tareas.php").
    then((response)=>{
     return response.json();
    }).then((data)=>{
        console.log(data);
        const tbody=document.querySelector(".tbody");
        
        
        data.forEach((tarea) => {
            const tr=document.createElement("tr");
            tr.innerHTML=`
                <td>${tarea.nombre_tarea}</td>
                <td>${tarea.nombre}</td>
                <input type='color' class='form-control form-control-color p-0' name='color' value='${tarea.color}'/>
                <form>
                <input type='submit' class="btn btn-danger" value='Actualizar'></input>
                </form>
                

            `;
            tbody.append(tr);
        });
        
    }).catch((error)=>{
        console.log("Hubo problemas con la peticion "+error.message);
    });
}

const getAllCategories=()=>{
    fetch("php/get_all_categories.php").
    then((response)=>response.json()).
    then((data)=>{

        console.log(data);

        data.forEach((category)=>{
            console.log(category.nombre);
            const categories=document.querySelector(".categoria");
            categories.innerHTML+=`
            <option value=${category.id_categoria}>${category.nombre}</option>
            `;
        });

    }).catch((error)=>{
        console.log("Hubo problemas con la peticion "+error.message)
    });
}

const addTask=()=>{
    const formAdd=document.querySelector(".form-add");
    formAdd.addEventListener("submit",(e)=>{
        e.preventDefault();

        const formData=new FormData(e.target);
        fetch("php/add_tarea.php",{
            method:'POST',
            body:formData
        }).then((response)=>response.json()).
        then((data)=>{
            if(data.status=="success"){
                Swal.fire({
                    title:"Exito",
                    text:"Tarea creada correctamente",
                    icon:"success",
                    allowOutsideClick:false,
                    confirmButtonText:"confirmar"
                }).then((result)=>{
                    if(result.isConfirmed){
                        window.location.href="index.html";
                    }
                });
            }else{
                console.log("error al insertar");
            }
        }).catch((error)=>console.error("Hubo problemas con la peticion "+error.message));
    });
    
}