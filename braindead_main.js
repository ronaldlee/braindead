

$( document ).ready(function() {
  $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"));

  $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"), {}, 
    { 
      success: function() {
        $('#quiz-add-button').on('click', 
          function() { 
            console.log('clicked'); 

          }
        );
      }
    }
  );

  $("#braindead-main").tabs();

});

