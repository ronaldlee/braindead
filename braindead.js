
//document.body.style.backgroundColor="blue";

$(document).ready(function(){
    if ($('#braindead').length) {
        $("#braindead").fadeOut( "fast", function() {
            $('#braindead').remove();
        });
    }
    else {
        var content = 
          "<div id='braindead'> \
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
          </div>";
        $('body').append(content);

        //$('body').loadTemplate("chrome-extension-resource://templates/braindead_main.html");
        
      /*
        var content = "<div id='braindead'></div>";
        $('body').append(content);
        $('#braindead').loadTemplate(chrome.extension.getURL("/templates/braindead_main.html"));
        */
        $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"));

        $("#braindead").tabs();
        $("#braindead").draggable();
        $("#braindead").fadeIn("fast");
    }

//    $('#braindead').load('popup.html');
});

//$('body').append('<div>BOOO</div>');

