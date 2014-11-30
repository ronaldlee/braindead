

$( document ).ready(function() {
  var params = location.href.split('?')[1].split('&');
  data = {};
  for (x in params)
  {
     data[params[x].split('=')[0]] = params[x].split('=')[1];
  }

  $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"), {},
    {
      success: function() {
        $('#quiz-add-button').on('click', 
          function() { 
            //console.log('clicked5: tab: ' + JSON.stringify(data)); 
          }
        );
      }
    }
  );

  $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

  $("#braindead-main").tabs();

});

