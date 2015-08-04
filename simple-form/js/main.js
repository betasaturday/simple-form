var queue = [];

(function () {
    var submit = document.querySelector("input[type=submit]");
    
    submit.addEventListener("click",
        function (e) {
            e.preventDefault();
            sendAJAXRequest();
        });
    document.querySelector("#upload_photo").addEventListener("change", function() {
        var files = this.files;
        for (var i = 0; i < files.length; ++i) {
            preview(files[i]);
        }

        this.value = "";
    });
    
    function preview(file) {
        var area = document.querySelector(".upload-images");
        var template = document.querySelector("#image-item").innerHTML;
        
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            reader.addEventListener("load", function(event) {
                var htmlImage = template.replace("{{image}}", event.target.result);
                htmlImage = htmlImage.replace("{{name}}", file.name);
                
                area.innerHTML += htmlImage;
                
                var currentLi = area.querySelector("li:last-child");
                queue.push({file: file, li: currentLi});
                
                var links = area.querySelectorAll(".del-link");
                for (var i = 0; i < links.length; ++i)
                {
                    a = links[i];
                    (function(a){
                    a.addEventListener("click", function(e){
                        e.preventDefault();
                        removePreview(a.parentNode.parentNode);
                    });
                    //console.log(a.parentNode.parentNode);
                    
                    })(a);
                }
               
                
            }, false);
            reader.readAsDataURL(file);
        }    
    }
    
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
    
    console.log(queue.length);
    queue.forEach(function(element) {
        data.append(element.file.name, element.file);
        console.log(element.file.name);
     });
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("post", "/Home/Echo/send?"+  (new Date()).getTime(), true);
    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
        }
    });

    xhr.send(data);
}

function removePreview(li) {
    queue.filter(function(element){
        return element.li != li;
    });
    li.parentNode.removeChild(li);
}