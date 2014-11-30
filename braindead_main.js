

$( document ).ready(function() {


  $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"), {},
    { 
      success: function() {
        $('#quiz-add-button').on('click', 
          function() { 
            console.log('clicked4: tab: ' + config); 


          }
        );
      }
    }
  );

  $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

  $("#braindead-main").tabs();

});

