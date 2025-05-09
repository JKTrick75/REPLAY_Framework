/* AJAX PROMISE */
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        // console.log(sUrl);
        // console.log(sType);
        // console.log(sTData);
        // console.log(sData);
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link += "/" + aux[1] + "/";	
        }else{
        	link += "/" + aux[1];
        }
    }
    return "http://localhost/REPLAY_Framework" + link;
}