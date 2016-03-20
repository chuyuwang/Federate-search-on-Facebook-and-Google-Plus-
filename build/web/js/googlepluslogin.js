/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function render() {
    gapi.signin.render('customBtn', {
        'callback': 'loginCallback',
        'clientid': '11265900965-p8pjrao82fnj4t192cl94efq4m5ld01u.apps.googleusercontent.com',
        'cookiepolicy': 'single_host_origin',
        'requestvisibleactions': 'http://schema.org/AddAction',
        'scope': 'https://www.googleapis.com/auth/plus.login'
    });
}

function loginCallback(result)
{
    if (result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get(
                {
                    'userId': 'me'
                });
        request.execute(function (resp)
        {
            var email = '';
            if (resp['emails'])
            {
                for (i = 0; i < resp['emails'].length; i++)
                {
                    if (resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }
            document.getElementById("glogout").setAttribute("class", "inline gpbtn");
            document.getElementById("customBtn").setAttribute("class", "hide gpbtn");

            var sourceDiv = document.createElement("div");
            sourceDiv.setAttribute("id", "indexsource");
            sourceDiv.setAttribute("class", "inline");
            var sourceImg = document.createElement("img");
            sourceImg.setAttribute("src", "image/gp.png");
            sourceDiv.appendChild(sourceImg);
            var nameText = document.createTextNode("  " + resp['displayName']);

            var myNode = document.getElementById("google");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            document.getElementById("google").appendChild(sourceDiv);
            document.getElementById("google").appendChild(nameText);
        });
    }
}

function onLoadCallback()
{
    gapi.client.setApiKey('AIzaSyDV-iWu8HGWn9nDOo5mO3Br6VkKIVinyKg');
    gapi.client.load('plus', 'v1', function () {
    });
}

(function () {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function logout()
{
    gapi.auth.signOut();
    location.reload();
}

