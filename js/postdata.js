var numberState = -1;
function getEle(id) {
    return document.querySelector(id);
}

const sendHttpRequest = (method, url, data) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
  
      xhr.responseType = 'json';
     
      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
  
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
  
      xhr.onerror = () => {
        reject('Something went wrong!');
      };
  
      xhr.send(JSON.stringify(data));
    });
  };
const url = 'https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs'
function API () {
    this.get = function(data) {
        return sendHttpRequest('GET', url,data);
    }
    this.post = function (idUser,titleUser,date,img,contentUser) {
      return  sendHttpRequest('POST', url, {content: `${contentUser}`,
        createdAt: `${date}`,
        id: `${idUser}`,
        image: `${img}`,
        title: `${titleUser}`,
          })
    }
    this.put = function (idUser,titleUser,date,img,contentUser) {
       return sendHttpRequest('PUT', `${url}/${idUser}`, {content: `${contentUser}`,
        createdAt: `${date}`,
        image: `${img}`,
        title: `${titleUser}`,
          })
    }
    this.delete = function (id) {
        return sendHttpRequest('DELETE', `${url}/${id}`);
    }

}
var api = new API;
// ---------------------------------------------------------
function takeData(button,funtion) {
    getEle(`${button}`).addEventListener('click',function () {
        var idUser = getEle('#idUser').value;
        var titleUser = getEle('#title').value;
        var date = getEle('#date').value;
        var img = getEle('#imgUser').value;
        var contentUser = getEle('#content').value;
        funtion(idUser,titleUser,date,img,contentUser);
    }); 
    
}

 function LoadData(data) {
    api.get().then((rs) => {
        // Pagination(responseData);
       
        data = numberState;
        console.log('---------------------'+data);
        console.log(rs);
        Pagination(rs,data);
        deleteUser();
      });
}
 function postdatauser() {
    takeData('#button_Insert',(idUser,titleUser,date,img,contentUser)=>{
        let table = document.getElementById("table-body");
        table.innerHTML="";
       api.post(idUser,titleUser,date,img,contentUser).then(responseData => {
              LoadData();
            }).catch((er)=>{
                console.log('day roi cau vang oi');
                LoadData();
            });
    })
}
 function putdatauser() {
    takeData('#button_Edit',(idUser,titleUser,date,img,contentUser)=>{
        api.put(idUser,titleUser,date,img,contentUser)
            .then(responseData => {
               
               console.log(responseData);
                LoadData();
            });
            
    })
}


// function deleteUser() {
//     let btnDelete = document.querySelectorAll('.deletebtn');
//     console.log('Day la delete:' + btnDelete);
//     btnDelete.forEach(function (item) {
//         item.addEventListener('click',()=>{
//             console.log(item.id);
//             api.delete(item.id).then((rs)=>{
//                 console.log('thanh cong roi');
//             });
//         })
//     })
// }

let rowsUser2 = 5;


 function selectionValue() {
    var dropMenu = getEle('#dropdown-menu');
    dropMenu.addEventListener('change',function () {
        console.log('Value============: '+dropMenu.value)
        if (dropMenu.value == 10) {
            rowsUser2 = 10;
        }else{
            rowsUser2 = 5;
        }
        LoadData();
    })
 }

 function Pagination(rs,numberPage) {
    console.log('++++++++++++++++++++' + numberPage);
    console.log('STT111111111111:'+ numberState);
    // console.log('ROWS:' + rowsUser2)
    let table = document.getElementById("table-body");
    table.innerHTML="";
    
    var state = {
        'querySet': rs,

        'page': 1,
        'rows': `${rowsUser2}`,
        'window': 5,
    }
    function pagination(querySet, page, rows) {

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = querySet.slice(trimStart, trimEnd)
        console.log('do dai '+ querySet.length);
        var pages = Math.ceil(querySet.length / rows);
        return {
            'querySet': trimmedData,
            'pages': pages,
        }
    }
    function pageButtons(pages) {
        var wrapper = document.getElementById('pagination-wrapper');
    //    state.page = states;

        wrapper.innerHTML = ``
        console.log('Pages:', pages)

        var maxLeft = (state.page - Math.floor(state.window / 2))
        var maxRight = (state.page + Math.floor(state.window / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = state.window
        }

        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1)

            if (maxLeft < 1) {
                maxLeft = 1
            }
            maxRight = pages
        }



        for (var page = maxLeft; page <= maxRight; page++) {
            wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
        }

        if (state.page != 1) {
            wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
        }

        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
        }
        


        // getEle('.page').addEventListener('click', function () {
        //    var tablebody =  getEle('#table-body')
        //    while (tablebody.hasChildNodes()) {
        //     tablebody.removeChild(tablebody.firstChild);
        //   }
        //     state.page = Number($(this).val())

        //     buildTable()
        // })
      
        let pageNV = document.querySelectorAll('.page');
        pageNV.forEach(function (item) {
            item.addEventListener('click', function () {
                let list = getEle('#table-body');
                while (list.hasChildNodes()) {
                    list.removeChild(list.firstChild);
                  }
                // console.log(Number($(this).val()));
                //  state.page = Number(item.value);
        
                state.page = Number(item.value);
                numberState= state.page;

                console.log('day ne trung ------------'+numberState);
                console.log('Trung2 -----------' + numberPage);
                // console.log('SoTT:'+ state.page);
                // numberState = Number(item.value);
                // console.log('he1heeheheh'+numberState);
                state.rows = rowsUser2;
                console.log('Day roi..................'+rowsUser2);
                buildTable()
                
                if (item.value==numberPage) {
                    console.log('resuel'+ item.value);
                    item.click();
                }
            })
        });

        let btnDelete = document.querySelectorAll('.deletebtn');
        btnDelete.forEach(function (item) {
            item.addEventListener('click',()=>{
                console.log(item.id);
                api.delete(item.id).then((rs)=>{
                    console.log('thanh cong roi');
                    LoadData();
                  
                });
              
            })
        })
        // $('.page').on('click', function () {
        //     $('#table-body').empty()
        //     console.log(Number($(this).val()));
        //     state.page = Number($(this).val())

        //     buildTable()
        // })


    }
    function buildTable() {
        var table = document.getElementById('table-body');
        // state.page = numberState;
        var data = pagination(state.querySet, state.page, state.rows)
        console.log(data);
        var myList = data.querySet;
        console.log(myList);
        myList.forEach(function (item,i ) {
            // --------------
            let newsDate = item.createdAt.toString();

            let timestamp = new Date(newsDate).getTime();
            let Day = new Date(timestamp).getDate();
            let Month = new Date(timestamp).getMonth() + 1;
            let Year = new Date(timestamp).getFullYear();
            let House = new Date(timestamp).getHours();
            let Minust = new Date(timestamp).getMinutes();
            let OurNewDateFormat = `${Month}/${Day}/${Year}  ${House}:${Minust}`;
            // -----------------------
            // <td>${i + 1}</td>
            var trUser = document.createElement('tr');
            function theTD(value) {
                var td = document.createElement('td');
                td.innerHTML = value;
                return td;
            }
            var imgPT = document.createElement('img');
            imgPT.setAttribute('src',`${item.image}`); 
            
            var itemId = theTD(`${item.id}`);
            var itemTitle = theTD(`${item.title}`);
            var itemOurNew = theTD(`${OurNewDateFormat}`);
            // var buttonD = theTD(`<button class="btn" id="${item.id}" onclick="deleteuser(${item.id})" ><i class="fa fa-times"></i>`);
            var buttonD = theTD(`<button class="btn deletebtn" id="${item.id}" ><i class="fa fa-times"></i>`);
            var itemContent = theTD(`${item.content}`); 
            var itemImage = document.createElement('td');
            var itemImage = document.createElement('td');

            itemImage.appendChild(imgPT);

            trUser.appendChild(itemId);
            trUser.appendChild(itemTitle);
            trUser.appendChild(itemOurNew);
            trUser.appendChild(itemImage);
            trUser.appendChild(itemContent);
            trUser.appendChild(buttonD);
            table.appendChild(trUser);


           


            // ---------------
            // var row = `<tr>
            //           <td>${item.id}</td>
            //         <td>${item.title}</td>
            //          <td>${OurNewDateFormat}</td>
            //          <td><img src="${item.image}" alt=""></td>
            //          <td>${item.content}</td>
            //          <td><button class="btn" id="${item.id}" onclick="deleteuser(${item.id})" ><i class="fa fa-times"></i></button></td>
            //          </tr>
            //           `;
            // table.append(row);
      
        });
        
        // console.log('chinh xac roi'+numberState);
        pageButtons(data.pages);
        console.log('NumberPage Last q: ' + numberPage)
        let pageNV = document.querySelectorAll('.page');
        pageNV.forEach(function (item) {
            console.log('NumberPage Last w :' + numberPage)
                if (item.value==numberPage) {
                    console.log('resuel'+ item.value);
                    item.click();
                }
        });
    }
    buildTable();
};
export {postdatauser,putdatauser,LoadData,selectionValue};


