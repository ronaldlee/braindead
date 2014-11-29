
//document.body.style.backgroundColor="blue";

$(document).ready(function(){
    if ($('#braindead-iframe').length) {
        $("#braindead-iframe").fadeOut( "fast", function() {
            $('#braindead-iframe').remove();
        });
    }
    else {
      /*
        var content = 
          "<div id='braindead'> \
             <div id='braindead-main'> \
               <ul> \
                 <li><a href='#braindead-tabs-1'>Quiz</a></li> \
                 <li><a href='#braindead-tabs-2'>Others</a></li> \
                 <li><a href='#braindead-tabs-3'>Config</a></li> \
               </ul> \
               <div id='braindead-tabs-1' class='tab-content'> \
               </div> \
               <div id='braindead-tabs-2' class='tab-content'> \
               </div> \
               <div id='braindead-tabs-3' class='tab-content'> \
               </div> \
             </div> \
             <div id='braindead-bottom'> \
             </div> \
          </div>";
          */
        var content = "<iframe frameBorder='0' scrolling='no' id='braindead-iframe' src='" + chrome.extension.getURL("/templates/braindead_main.html") + "' />";

        $('html').append(content);

        //$('body').loadTemplate("chrome-extension-resource://templates/braindead_main.html");
        
      /*
        var content = "<div id='braindead'></div>";
        $('body').append(content);
        $('#braindead').loadTemplate(chrome.extension.getURL("/templates/braindead_main.html"));
        */
        /*
        $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"));
        $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

        $("#braindead").draggable();
        $("#braindead").fadeIn("fast");

        $("#braindead-main").tabs();
        */

        $("#braindead-iframe").draggable();
        $("#braindead-iframe").fadeIn("fast");

//        $('#braindead-logo-img').attr('src', chrome.extension.getURL("/images/braindeadlogo.png"));
    }

//    $('#braindead').load('popup.html');
});

//$('body').append('<div>BOOO</div>');

