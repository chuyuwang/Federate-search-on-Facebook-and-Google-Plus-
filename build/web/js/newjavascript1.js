/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var xhr1, xhr2;

function show() {
    var body = document.getElementsByTagName('BODY')[0];
    var query = document.getElementById("query").value;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr1 = new XMLHttpRequest();
        xhr2 = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhr1 = new ActiveXObject("Microsoft.XMLHTTP");
        xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr1.onreadystatechange = call;
    xhr2.onreadystatechange = call;

    var fbtoken = "CAACEdEose0cBAF1rVzQkelRBiZCT2hSGHxFnHdHVvYDtZA8N1ozydEpqwQAl0ypceo1q9nyQfoxyA0Q7cmtATINLcuLkYdPUn5wZBdQnIRT3RVmkAnC4YwFXgNEZCMHnoIeQuFcYCE3VOj7Itxxj27XnWSEtrYEiQnQUFSl8lzFTafk7SFU2EVThv652lgcjrXh1SHKhtppZB0GmqauxW";
    var gptoken = "ya29.WgHYBeVtt-0WfzndUfzkEXJKEI8FYLw9XyKNUTbWF7NMWEB3n3DPxDXLF58SSrNAZk0A-6p1_LdmVQ";

    xhr1.open("GET", "https://graph.facebook.com/v2.3/search?q=" + query + "&type=user&access_token=" + fbtoken, true);
    xhr2.open("GET", "https://www.googleapis.com/plus/v1/people?query=" + query + "&access_token=" + gptoken, true);

    xhr1.send();
    xhr2.send();
}

function call() {
    var max = 50;
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            var JSONresp = JSON.parse(xhr1.responseText);
            data = JSONresp["data"];
            var name = [data.length];
            var id = [data.length];

            var myNode = document.getElementById("result1");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            
            for (var i = 0; i < max; i++) {
                name = data[i].name;
                id = data[i].id;

                var div = document.createElement("div");
                div.setAttribute("class", "result inline");

                //show image
                var a = document.createElement("a");
                a.setAttribute("href", "https://www.facebook.com/app_scoped_user_id/" + id + "/");
                var img = document.createElement("img");
                img.setAttribute("class", "inline");
                img.setAttribute("src", "https://graph.facebook.com/" + id + "/picture");
                a.appendChild(img);

                //For showing source
                var divs = document.createElement("div");
                divs.setAttribute("id", "source");
                divs.setAttribute("class", "inline");

                var srcfb = document.createElement("img");
                srcfb.setAttribute("src", "image/fb.png");

                divs.appendChild(srcfb);
                div.appendChild(divs);

                //Show name
                var p = document.createElement("p");
                var text = document.createTextNode(name);
                p.appendChild(text);

                div.appendChild(p);
                div.appendChild(a);
                div.appendChild(divs);
                document.getElementById("result1").appendChild(div);
            }
        }
    }
    if (xhr2.readyState === 4) {
        // status of 200 signifies sucessful HTTP call
        if (xhr2.status === 200) {
            var JSONresp = JSON.parse(xhr2.responseText);
            items = JSONresp["items"];
            var name = [items.length];
            var url = [items.length];
            var urlimg = [items.length];

            var myNode = document.getElementById("result");

            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            var max = 50;
            for (i = 0; i < max; i++) {
                console.log(items[i].displayName);
                name = items[i].displayName;
                url = items[i].url;
                urlimg = items[i].image.url;

                var div = document.createElement("div");
                div.setAttribute("class", "result inline");

                //show image
                var a = document.createElement("a");
                var img = document.createElement("img");
                a.setAttribute("href", url);
                img.setAttribute("class", "inline");
                img.setAttribute("src", urlimg);
                a.appendChild(img);

                //For showing source
                var divs = document.createElement("div");
                divs.setAttribute("id", "source");
                divs.setAttribute("class", "inline");

                var srcboth = document.createElement("img");
                srcboth.setAttribute("src", "image/bg.png");

                var srcfb = document.createElement("img");
                srcfb.setAttribute("src", "image/fb.png");

                var srcgp = document.createElement("img");
                srcgp.setAttribute("src", "image/gp.png");

                divs.appendChild(srcgp);
                div.appendChild(divs);

                //Show name
                var p = document.createElement("p");
                var text = document.createTextNode(name);
                p.appendChild(text);

                div.appendChild(p);
                div.appendChild(a);
                div.appendChild(divs);
                document.getElementById("result").appendChild(div);
            }
        }
    }
} // end of function