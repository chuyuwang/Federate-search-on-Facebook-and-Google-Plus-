/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var xhr1, xhr2;

function show() {
    var body = document.getElementsByTagName('BODY')[0];
    var query = sessionStorage.getItem("query");
    document.getElementById("query").value = query;
    console.log(query);
    max = 24;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr1 = new XMLHttpRequest();
        xhr2 = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhr1 = new ActiveXObject("Microsoft.XMLHTTP");
        xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr1.onreadystatechange = call;
    xhr2.onreadystatechange = call;

    var fbtoken = "CAACEdEose0cBABz4verjZAdiAXoZA74PTeWnPHaFKpibq010jhz4T4pHNH3SeCJYLDKmemqU9uceaurnw9gDIMHrsSnBAISWi6wJcZCp9dWXnZBLjaZCzLiSK4wZBuhcw8hOelgPAUldzH1pr4Ddp5gs28fxtg6YKcj8lXwOVLraKkygLCHhSWTGbdTpZA4NmSnb9M8CfudIZBXOgtZCo1ZCZBk";
    var gptoken = "ya29.WwH73eJhaAjE7_YM7GTWsfcUxyCL9OaBXfQ4VLwDoN1cY8U1WcZ9aFEJNoKWImTulMP7pFC-Hl8n3w";

    xhr1.open("GET", "https://graph.facebook.com/v2.3/search?q=" + query + "&type=user&access_token=" + fbtoken, true);
    xhr2.open("GET", "https://www.googleapis.com/plus/v1/people?query=" + query + "&access_token=" + gptoken, true);

    xhr1.send();
    xhr2.send();
}

function call() {
    if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
            var JSONresp = JSON.parse(xhr1.responseText);
            data = JSONresp["data"];

            nameface = Array(max);
            idface = Array(max);
            mutualface = Array(max);

            for (i = 0; i < max; i++) {
                nameface[i] = data[i].name;
                idface[i] = data[i].id;
                //console.log(nameface[i]);
                mutualface[i] = Math.ceil(Math.random() * 50);
            }
//            console.log(mutualface);
//            console.log(nameface);
//            console.log(idface);
        }
    }

    for (i = 0; i < max; i++) {
        tmp = mutualface[i];
        tmp1 = nameface[i];
        tmp2 = idface[i];
        mark = i;
        for (j = i + 1; j < max; j++) {
            if (tmp < mutualface[j]) {
                tmp = mutualface[j];
                tmp1 = nameface[j];
                tmp2 = idface[j];
                mark = j;
            }
        }
        mutualface[mark] = mutualface[i];
        nameface[mark] = nameface[i];
        idface[mark] = idface[i];
        mutualface[i] = tmp;
        nameface[i] = tmp1;
        idface[i] = tmp2;
    }
    if (xhr2.readyState === 4) {
        // status of 200 signifies sucessful HTTP call
        if (xhr2.status === 200) {
            var JSONresp = JSON.parse(xhr2.responseText);
            items = JSONresp["items"];
            namegoogle = Array(max);
            urlgoogle = Array(max);
            urlimggoogle = Array(max);
            mutualgoogle = Array(max);
            for (i = 0; i < max; i++) {
                //console.log(items[i].displayName);
                namegoogle[i] = items[i].displayName;
                urlgoogle[i] = items[i].url;
                urlimggoogle[i] = items[i].image.url;
                mutualgoogle[i] = Math.ceil(Math.random() * 50);
            }
        }
    }
    for (i = 0; i < max; i++) {
        tmp = mutualgoogle[i];
        tmp1 = namegoogle[i];
        tmp2 = urlgoogle[i];
        tmp3 = urlimggoogle[i];
        mark = i;
        for (j = i + 1; j < max; j++) {
            if (tmp < mutualgoogle[j]) {
                tmp = mutualgoogle[j];
                tmp1 = namegoogle[j];
                tmp2 = urlgoogle[j];
                tmp3 = urlimggoogle[j];
                mark = j;
            }
        }
        mutualgoogle[mark] = mutualgoogle[i];
        namegoogle[mark] = namegoogle[i];
        urlgoogle[mark] = urlgoogle[i];
        urlimggoogle[mark] = urlimggoogle[i];
        mutualgoogle[i] = tmp;
        namegoogle[i] = tmp1;
        urlgoogle[i] = tmp2;
        urlimggoogle[i] = tmp3;
    }
    showslider();
} // end of function

function facebook() {
    percent = 0;
    showrank();
    document.getElementById("rangeinput").value=0;
}
function google() {
    percent = 1;
    showrank();
    document.getElementById("rangeinput").value=100;
}

function showslider(){
    percent = document.getElementById("rangeinput").value / 100;
    showrank();
}

function showrank() {
//    percent = document.getElementById("rangeinput").value / 100;
    count = 0;
    i = 0;
    j = 0;
    var myNode = document.getElementById("resultbox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    while (count < max) {
        if ((mutualgoogle[i] * percent) > (mutualface[j] * (1 - percent))) {

            source = "image/gp.png";

            var resultDiv = document.createElement("div");
            resultDiv.setAttribute("class", "result inline");

            var panelDiv = document.createElement("div");
            panelDiv.setAttribute("class", "panel panel-default");

            var panel_headingDiv = document.createElement("div");
            panel_headingDiv.setAttribute("class", "panel-headinggp");

            var nameSpan = document.createElement("span");
            nameSpan.setAttribute("class", "title");
            var nameText = document.createTextNode(namegoogle[i]);
            nameSpan.appendChild(nameText);

            panel_headingDiv.appendChild(nameSpan);

            var panel_collapseDiv = document.createElement("div");
            panel_collapseDiv.setAttribute("class", "panel-collapse");

            var link = document.createElement("a");
            link.setAttribute("href", urlgoogle[i]);

            var usrimg = document.createElement("img");
            usrimg.setAttribute("class", "inline img-rounded");
            usrimg.setAttribute("src", urlimggoogle[i]);

            link.appendChild(usrimg);

            var sourceDiv = document.createElement("div");
            sourceDiv.setAttribute("id", "source");
            sourceDiv.setAttribute("class", "inline");
            var sourceImg = document.createElement("img");
            sourceImg.setAttribute("src", source);

            sourceDiv.appendChild(sourceImg);
            panel_collapseDiv.appendChild(sourceDiv);
            panel_collapseDiv.appendChild(link);

            var panel_footerDiv = document.createElement("div");
            panel_footerDiv.setAttribute("class", "panel-footer");

            var infoSpan = document.createElement("span");
            infoSpan.setAttribute("class", "text-info");
            var infoText = document.createTextNode("Mutual Friend: " + mutualgoogle[i]);
            infoSpan.appendChild(infoText);
            panel_footerDiv.appendChild(infoSpan);

            panelDiv.appendChild(panel_headingDiv);
            panelDiv.appendChild(panel_collapseDiv);
            panelDiv.appendChild(panel_footerDiv);

            document.getElementById("resultbox").appendChild(panelDiv);
            i++;
        } else {

            source = "image/fb.png";
            urlfb = "https://www.facebook.com/app_scoped_user_id/" + idface[j] + "/";
            urlimgfb = "https://graph.facebook.com/" + idface[j] + "/picture";

            var resultDiv = document.createElement("div");
            resultDiv.setAttribute("class", "result inline");

            var panelDiv = document.createElement("div");
            panelDiv.setAttribute("class", "panel panel-default");

            var panel_headingDiv = document.createElement("div");
            panel_headingDiv.setAttribute("class", "panel-headingfb");

            var nameSpan = document.createElement("span");
            nameSpan.setAttribute("class", "title");
            var nameText = document.createTextNode(nameface[j]);
            nameSpan.appendChild(nameText);
            panel_headingDiv.appendChild(nameSpan);

            var panel_collapseDiv = document.createElement("div");
            panel_collapseDiv.setAttribute("class", "panel-collapse");

            var link = document.createElement("a");
            link.setAttribute("href", urlfb);

            var usrimg = document.createElement("img");
            usrimg.setAttribute("class", "inline img-rounded");
            usrimg.setAttribute("src", urlimgfb);

            link.appendChild(usrimg);

            var sourceDiv = document.createElement("div");
            sourceDiv.setAttribute("id", "source");
            sourceDiv.setAttribute("class", "inline");
            var sourceImg = document.createElement("img");
            sourceImg.setAttribute("src", source);

            sourceDiv.appendChild(sourceImg);
            panel_collapseDiv.appendChild(sourceDiv);
            panel_collapseDiv.appendChild(link);

            var panel_footerDiv = document.createElement("div");
            panel_footerDiv.setAttribute("class", "panel-footer");

            var infoSpan = document.createElement("span");
            infoSpan.setAttribute("class", "text-info");
            var infoText = document.createTextNode("Mutual Friend: " + mutualface[j]);
            infoSpan.appendChild(infoText);
            panel_footerDiv.appendChild(infoSpan);

            panelDiv.appendChild(panel_headingDiv);
            panelDiv.appendChild(panel_collapseDiv);
            panelDiv.appendChild(panel_footerDiv)

            document.getElementById("resultbox").appendChild(panelDiv);
            j++;
        }
        count++;
    }
}