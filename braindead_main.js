Parse.initialize("Ga3gF3LIgw8nSXtygi7fodmlehYPT7vc5gdyPnuz", "n3TQpqA2CqUXBSGysKHDQZGENIiy8SYOcpqRpB6j");

var tabUrl;

/*
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
    alert("yay! it worked");
});
*/

function addQuiz() {
  alert("addQuiz");
  var question = $('#question').val();
  var answer   = $('#answer').val();

  var Quiz = Parse.Object.extend("Quiz");
  var quiz = new Quiz();
   
  quiz.set("question", question);
  quiz.set("answer",answer);
  quiz.set("url", tabUrl);
   
  quiz.save(null, {
    success: function(quiz) {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + quiz.id);
      },
      error: function(quiz, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
  });

}

function signupUser() {
  var email = $('#email').val();
  var pwd   = $('#pwd').val();

  var user = new Parse.User();
  user.set("username", email);
  user.set("password", pwd);
  user.set("email", email);
   
  user.signUp(null, {
    success: function(user) {
      alert('Signup ok');
      $("#braindead-main-container").show();
      $("#braindead-login").hide();
    },
    error: function(user, error) {
      alert("signup Error: " + error.code + " " + error.message);
    }
  });
}

function loginUser() {
  var email = $('#email').val();
  var pwd   = $('#pwd').val();

  Parse.User.logIn(email, pwd, {
    success: function(user) {
    // Do stuff after successful login.
      alert('login success');
      $("#braindead-main-container").show();
      $("#braindead-login").hide();
    },
    error: function(user, error) {
    // The login failed. Check error to see why.
      alert("login Error: " + error.code + " " + error.message);
    }
  });
}

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

    if (data['tabUrl']) {
      tabUrl = data['tabUrl'];
    }

    $('#braindead-tabs-1').loadTemplate(chrome.extension.getURL("/templates/braindead_quiz_tab.html"), {},
      {
        success: function() {
          $('#quiz-add-button').click(addQuiz);
        }
      }
    );

    $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

    $("#braindead-main").tabs();

  } else {
    // show the signup or login page
    
    $('#login-button').click(loginUser);
    $('#signup-button').click(signupUser);
    $('#braindead-login').show();
  }


});

