export const postdatauser =()=>{
    $('#button_Insert').on('click',function () {
        var idUser = $('#idUser').val();
        var titleUser = $('#title').val();
        var date = $('#date').val();
        var img = $('#imgUser').val();
        var contentUser = $('#content').val();
        const postawai = ()=>{
            return new Promise((resolve, reject)=>{
                $.ajax({
                    url:"https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs",
                    method: 'POST',
                    dataType: 'json',
                    data:{
                        content: `${contentUser}`,
                        createdAt: `${date}`,
                        id: `${idUser}`,
                        image: `${img}`,
                        title: `${titleUser}`,
                    },
                    success: function (data) {
                        console.log(data);
                        resolve(data);
                        // LoadData();
                    },
                    error:function(data){
                        reject(data);
                    }
                });
            })
        };
        postawai();
    });  
}


export const putdatauser =()=>{
    $('#button_Edit').on('click',function () {
        var idUser = $('#idUser').val();
        var titleUser = $('#title').val();
        var date = $('#date').val();
        var img = $('#imgUser').val();
        var contentUser = $('#content').val();
        const postawai = ()=>{
            return new Promise((resolve, reject)=>{
                $.ajax({
                    url:`https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs/${idUser}`,
                    method: 'PUT',
                    dataType: 'json',
                    data:{
                        content: `${contentUser}`,
                        createdAt: `${date}`,
                        id: `${idUser}`,
                        image: `${img}`,
                        title: `${titleUser}`,
                    },
                    success: function (data) {
                        console.log(data);
                        resolve(data);
                        // LoadData();
                    },
                    error:function(data){
                        console(reject(data));
                    }
                });
            })
        };
        postawai();
    });
}

export const deleteuser =()=>{
    $('#button_Edit').on('click',function () {
        var idUser = $('#idUser').val();
        var titleUser = $('#title').val();
        var date = $('#date').val();
        var img = $('#imgUser').val();
        var contentUser = $('#content').val();
        const postawai = ()=>{
            return new Promise((resolve, reject)=>{
                $.ajax({
                    url:`https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs/${idUser}`,
                    method: 'PUT',
                    dataType: 'json',
                    data:{
                        content: `${contentUser}`,
                        createdAt: `${date}`,
                        id: `${idUser}`,
                        image: `${img}`,
                        title: `${titleUser}`,
                    },
                    success: function (data) {
                        console.log(data);
                        resolve(data);
                        // LoadData();
                    },
                    error:function(data){
                        console(reject(data));
                    }
                });
            })
        };
        postawai();
    });
}