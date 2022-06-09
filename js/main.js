import {postdatauser,putdatauser} from './postdata.js';



$(document).ready(function () {
    LoadData();
    // postData();
    postdatauser();
    putdatauser();
})

function LoadData() {
    $.ajax({
        url: "https://617b71c2d842cf001711bed9.mockapi.io/api/v1/blogs",
        type: "GET",
        success: function (rs) {
            console.log(rs);
            var str = "";
            //  $.each(rs,function (i,item) {

            //      // --------------
            //      let newsDate = item.createdAt.toString();

            //      let timestamp = new Date(newsDate).getTime();
            //      let Day = new Date(timestamp).getDate();
            //      let Month = new Date(timestamp).getMonth() + 1;
            //      let Year = new Date(timestamp).getFullYear();
            //      let House = new Date(timestamp).getHours();
            //      let Minust = new Date(timestamp).getMinutes();
            //      let OurNewDateFormat = `${Month}/${Day}/${Year}  ${House}:${Minust}`;

            //      // ---------------
            //      str += "<tr>";
            //      str += "<td>" + (i+1) +"</td>";
            //      str += "<td>" + item.id +"</td>";
            //      str += "<td>" + item.title +"</td>";
            //      str += "<td>" + OurNewDateFormat +"</td>";
            //      str += `<td> <img src="${item.image}" alt=""></td>`;
            //      str += "<td>" + item.content +"</td>";
            //      str += "</tr>";
            //  });
            //  $('#load_data').html(str);
            Pagination(rs);

        }
    })
}

function Pagination(rs) {
    var state = {
        'querySet': rs,

        'page': 1,
        'rows': 5,
        'window': 5,
    }

    buildTable()

    function pagination(querySet, page, rows) {

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = querySet.slice(trimStart, trimEnd)

        var pages = Math.round(querySet.length / rows);

        return {
            'querySet': trimmedData,
            'pages': pages,
        }
    }

    function pageButtons(pages) {
        var wrapper = document.getElementById('pagination-wrapper')

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

        $('.page').on('click', function () {
            $('#table-body').empty()

            state.page = Number($(this).val())

            buildTable()
        })

    }


    function buildTable() {
        var table = $('#table-body')

        var data = pagination(state.querySet, state.page, state.rows)
        var myList = data.querySet

        
        $.each(myList, function (i, item) {

            // --------------
            let newsDate = item.createdAt.toString();

            let timestamp = new Date(newsDate).getTime();
            let Day = new Date(timestamp).getDate();
            let Month = new Date(timestamp).getMonth() + 1;
            let Year = new Date(timestamp).getFullYear();
            let House = new Date(timestamp).getHours();
            let Minust = new Date(timestamp).getMinutes();
            let OurNewDateFormat = `${Month}/${Day}/${Year}  ${House}:${Minust}`;
            // <td>${i + 1}</td>
            // ---------------
            var row = `<tr>
                  
                      <td>${item.id}</td>
                    <td>${item.title}</td>
                     <td>${OurNewDateFormat}</td>
                     <td><img src="${item.image}" alt=""></td>
                     <td>${item.content}</td>
                     <td><button  id="${item.id}" class="btn"><i class="fa fa-times"></i></button></td>
                     </tr>
                      `
            table.append(row)
          
        });

        pageButtons(data.pages)
    }

}



