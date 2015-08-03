(function () {
    var submit = document.querySelector("input[type=submit]");
    submit.addEventListener("click",
        function (e) {
            e.preventDefault();
            sendAJAXRequest();
        });
})();

function getQueryString() {
    var elements = document.querySelectorAll("input[type=text]"), queryString = "", i;
    
    for (i = 0; i < elements.length; i++) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        
        queryString = queryString + encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
    }
    var select = document.querySelector("[name=month]");
    var value = select.options[select.selectedIndex].value;
    
    queryString = queryString + "month=" + encodeURIComponent(value) + "&";
    
    var radio = document.querySelector("[name=question]:checked");
    var value = radio.value;
    
    queryString += "question=" + encodeURIComponent(value) + "&";
    
    console.log(queryString.slice(-1));
    return queryString;
}

function sendAJAXRequest() {
    var form = document.querySelector("form");
    var data = new FormData(form);
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("post", "/Home/Echo/send?"+  (new Date()).getTime(), true);
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
        }
    });
    console.log(data.toString());
    xhr.send(data);
}