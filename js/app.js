const getAllTasks = () => {
    fetch("php/get_all_tareas.php").
        then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            const tbody = document.querySelector(".tbody");


            data.forEach((tarea) => {
                // const tr=document.createElement("tr");
                // tr.innerHTML=`
                //     <td>${tarea.nombre_tarea}</td>
                //     <td>${tarea.nombre}</td>
                //     <input type='color' class='form-control form-control-color p-0' name='color' value='${tarea.color}'/>
                //     <form>
                //     <input type='submit' class="btn btn-success" value='Actualizar' data-bs-toggle="modal" data-bs-target="#modal-actualizar"></input>
                //     <input type='submit' class="btn btn-danger" value='Eliminar'></input>
                //     </form>        
                // `;
                // tbody.append(tr);
                //optimizacion con insertAdjacentHTML
                tbody.insertAdjacentHTML("beforeend", `
                <tr>
                <td>${tarea.nombre_tarea}</td>
                <td>${tarea.nombre}</td>
                <td>
                 <input type='color' class='form-control form-control-color p-0' disabled value='${tarea.color}'/>
                </td>
               <td class='d-flex flex-md-row flex-column gap-1'>
               <form  class='form-actualizar-edit' method='POST' >
               <input type='text' class='d-none' value='${tarea.id_tarea}' name='idTarea'></input>
               <button type='submit' class="btn btn-success btn-actualizar" data-bs-toggle="modal" data-bs-target="#modal-actualizar">
               <i class="ti ti-edit pe-none"></i>
               </button>
               </form>
               <form class='form-eliminar' method='POST'>
               <input type='text' class='d-none' name='idTarea' value='${tarea.id_tarea}'>
               </input>  
                <button type='submit' class="btn btn-danger btn-eliminar">
                <i class='ti ti-trash pe-none'></i>
                </button>
               </form>
               </td>
               </tr>
            `);
            });

        }).catch((error) => {
            console.log("Hubo problemas con la peticion " + error.message);
        });
}

const getAllCategories = () => {
    fetch("php/get_all_categories.php").
        then((response) => response.json()).
        then((data) => {
            const selectCategoria = document.querySelectorAll(".categoria");
            console.log(data);
            data.forEach((categoria) => {
                selectCategoria.forEach((sCategoria)=>{
                    sCategoria.insertAdjacentHTML("beforeend",`
                        <option value=${categoria.id_categoria}>${categoria.nombre}</option>    
                    `);
                });
            //     categories.innerHTML += `
            // <option value=${category.id_categoria}>${category.nombre}</option>
            // `;
            //optimizacion con insertAdjacentHTML
            
            });

        }).catch((error) => {
            console.log("Hubo problemas con la peticion " + error.message)
        });
}

const addTask = () => {
    const formAdd = document.querySelector(".form-add");
    formAdd.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        fetch("php/add_tarea.php", {
            method: 'POST',
            body: formData
        }).then((response) => response.json()).
            then((data) => {
                if (data.status == "success") {
                    Swal.fire({
                        title: "Exito",
                        text: "Tarea creada correctamente",
                        icon: "success",
                        allowOutsideClick: false,
                        confirmButtonText: "confirmar"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "index.html";
                        }
                    });
                } else {
                    console.log("error al insertar");
                }
            }).catch((error) => console.error("Hubo problemas con la peticion " + error.message));
    });
}

const getByIdTask=()=>{
    const tableTareas=document.querySelector(".table-tareas");
    tableTareas.addEventListener("click",(e)=>{
        console.log(e);
        e.preventDefault();
       if(e.target.classList.contains("btn-actualizar")){
        
        const formData=new FormData(e.target.closest(".form-actualizar-edit"));
        
        fetch("php/get_by_id_tarea.php",{
            method:'POST',
            body:formData
        }).then(response=>response.json()).
        then(data=>{
            console.log(data);
            if(data.status=="success"){
                const idTarea=document.querySelector(".idTarea");
                const nombreTarea=document.querySelector(".nombre-tarea");
                const categoria=document.querySelector(".categoria-actualizar");
                
                idTarea.value=data.data.id_tarea;
                nombreTarea.value=data.data.nombre_tarea;
                categoria.value=data.data.categorias_id_categoria;
            }
        }).catch(error=>console.error("hubo un error en la peticion ",error));
       }else if(e.target.classList.contains("btn-eliminar")){
            console.log("se encontro boton eliminar",e.target);
            console.log(e.target.closest(".form-eliminar"));
            const dataForm=new FormData(e.target.closest(".form-eliminar"));
            console.log(dataForm);

            Swal.fire({
                title:"¿Esta seguro de eliminar la tarea?",
                icon:"warning",
                showDenyButton:true,
                confirmButtonText:"Si",
                denyButtonText:"No"
            }).then(response=>{
                if(response.isConfirmed){
                    fetch("php/delete_tarea.php",{
                        method:"POST",
                        body:dataForm
                    }).then(response=>response.json()).
                    then(data=>{
                        if(data.status=="success"){
                            Swal.fire({
                                title:"Tarea eliminada",
                                icon:"success",
                                confirmButtonText:"Cerrar"
                            }).then(response=>{
                                if(response.isConfirmed){
                                    window.location.href="index.html";
                                }
                            });
                        }else{
                            Swal.fire({
                                title:"Error",
                                text:`${data.message}`,
                                icon:"error"
                            });
                        }
                    });
                }else if(response.isDenied){
                    Swal.fire({
                        title:"Operacion cancelada",
                        icon:"success",
                        confirmButtonText:"Cerrar"
                    });
                }
            });
       }
    });
}


const updateTask=()=>{
    const formActualizar=document.querySelectorAll(".form-actualizar");
    formActualizar.forEach(formAct=>{
        formAct.addEventListener("submit",e=>{
            e.preventDefault();
            const formData=new FormData(e.target);

            console.log(formData);
            fetch("php/update_tarea.php",{
                method:"POST",
                body:formData
            }).then(response=>response.json()).
            then(data=>{
                 if(data.status=="success"){
                    Swal.fire({
                        title:"Exito",
                        text:"Tarea actualizada correctamente",
                        icon:"success",
                        allowOutsideClick:false,
                        confirmButtonText:"Confirmar"
                    }).then((response)=>{
                        if(response.isConfirmed){
                            window.location.href="index.html";
                        }
                    });
                 }
            }).catch(error=>console.error("Hubo un error en la peticion ",error));     
        });
    });
}

