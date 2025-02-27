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
               <td>
               <form  class='form-actualizar-edit' >
               <input type='text' class='d-none' value='${tarea.id_tarea}' name='idTarea'></input>
               <input type='submit' class="btn btn-success btn-actualizar" value='Actualizar' data-bs-toggle="modal" data-bs-target="#modal-actualizar"></input>
               </form>
               <form form-eliminar-edit>
               <input type='text' class='d-none' value='${tarea.id_tarea}'></input>  
                <input type='submit' class="btn btn-danger" value='Eliminar'></input>
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
    document.addEventListener("click",(e)=>{
       
       if(e.target.classList.contains("btn-actualizar")){
        e.preventDefault();
       
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
            }).catch(error=>console.error("Hubo un erroren la peticion ",error));     
        });
    });
}
