(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get", "hello.txt");
    
    xhr.addEventListener("readystatechange", function(){
        if (xhr.readyState == 4)
        {
            console.log(xhr.responseText);
        }
    });

    xhr.send();
})();