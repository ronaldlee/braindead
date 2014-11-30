//content script

$(document).ready(function(){

    if ($('#braindead-iframe').length) {
        $("#braindead-iframe").fadeOut( "fast", function() {
            $('#braindead-iframe').remove();
        });
    }
    else {
      console.log("read config3: " + config);

        var content = "<iframe frameBorder='0' scrolling='no' id='braindead-iframe' src='" + chrome.extension.getURL("/templates/braindead_main.html") + "' />";

        $('html').append(content);

        $("#braindead-iframe").draggable();
        $("#braindead-iframe").fadeIn("fast");

    }

});


