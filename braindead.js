//content script


/*
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    //this works too!!
    //alert('msg: ' + message);
  }
);
*/

$(document).ready(function(){

    if ($('#braindead-iframe').length) {
        $("#braindead-iframe").fadeOut( "fast", function() {
            $('#braindead-iframe').remove();
        });
    }
    else {
        //console.log("read config3: " + tabUrl);

        var content = "<iframe frameBorder='0' scrolling='no' id='braindead-iframe' src='" + chrome.extension.getURL("/templates/braindead_main.html") + "?tabUrl="+encodeURIComponent(tabUrl)+"' />";

        $('html').append(content);

        $("#braindead-iframe").draggable();
        $("#braindead-iframe").fadeIn("fast");

    }

});


