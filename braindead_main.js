Parse.initialize("Ga3gF3LIgw8nSXtygi7fodmlehYPT7vc5gdyPnuz", "n3TQpqA2CqUXBSGysKHDQZGENIiy8SYOcpqRpB6j");

/*
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
    alert("yay! it worked");
});
*/


$( document ).ready(function() {
  var isTest = false;

  var currentUser = Parse.User.current();
  if (currentUser || isTest) {
    $('#braindead-main-container').show();

    var params = location.href.split('?')[1].split('&');
    data = {};
    for (x in params)
    {
       data[params[x].split('=')[0]] = params[x].split('=')[1];
    }

    var tabUrl;
    if (data['tabUrl']) {
      tabUrl = data['tabUrl'];
    }

    $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"), {},
      {
        success: function() {
          $('#quiz-add-button').on('click', 
            function() { 
              console.log('clicked5: taburl: ' + tabUrl); 
            }
          );
        }
      }
    );

    $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

    $("#braindead-main").tabs();

  } else {
    // show the signup or login page
    
    $('#braindead-login').show();
  }


});

