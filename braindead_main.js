Parse.initialize("Ga3gF3LIgw8nSXtygi7fodmlehYPT7vc5gdyPnuz", "n3TQpqA2CqUXBSGysKHDQZGENIiy8SYOcpqRpB6j");

var tabUrl;

/*
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
    alert("yay! it worked");
});
*/

function fbShare(e) {
  alert('boooobeeeee');
  FB.ui(
  {
    method: 'share',
    href: 'https://developers.facebook.com/docs/'
  }, function(response){});
}

function fbLogin() {
}

function deleteQuiz(e) {
  var src = e.currentTarget;
  var quizId = $(src).data('quiz-id');

  var Quiz = Parse.Object.extend("Quiz");
  var query = new Parse.Query(Quiz);
  query.get(quizId, {
      success: function(quiz) {
        // The object was retrieved successfully.

          quiz.destroy({
            success: function(myObject) {
              // The object was deleted from the Parse Cloud.

              //remove that entry in the quizzes table
              $('#quizzes-table tr#' + quizId).remove();

            },
            error: function(myObject, error) {
              // The delete failed.
              // error is a Parse.Error with an error code and message.
            }
          });
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
  });
}

function addQuiz() {
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

        //add a row to the table
        row = $("<tr id='"+quiz.id+"'></tr>");
        col1 = $("<td class='quizzes-question'>"+question+"</td>");
        col2 = $('<td><a class="quiz_delete" id="quiz-delete-'+quiz.id+'" data-quiz-id="'+quiz.id+'" onclick="deleteQuiz(\''+quiz.id+'\');">Delete</a></td>');
        row.append(col1, col2);

        $('#quizzes-table').append(row);
        $('#quiz-delete-'+quiz.id).click(deleteQuiz);
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
  //hidden iframe to capture FB login crab
  elt = document.createElement('iframe');
  elt.id = 'facebook_load_frame';
  elt.src = 'http://54.149.101.128/braindead/iframe.html';
  document.getElementsByTagName('body')[0].appendChild(elt);

  // Message passing API from David Walsh at http://davidwalsh.name/window-iframe
  // // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
  // Listen to message from child window
  eventer(messageEvent,function(e) {
    console.log("Connection status: "+e.data.connectStatus+"; UserID: "+e.data.userID+"; AccessToken: "+e.data.accessToken);
    //This is the data from the Facebook SDK
  },false);
  
  //====
  FB.init({
    appId      : '1544469515798401',
    xfbml      : true,
    version    : 'v2.1'
  });

  var isTest = false;
  var isForceShowLogin = false;

  var currentUser = Parse.User.current();
  if (!isForceShowLogin && (currentUser || isTest)) {
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

    $('#fb-share-button').click(fbShare);

  } else {
    // show the signup or login page
    
    $('#login-button').click(loginUser);
    $('#signup-button').click(signupUser);
    $('#braindead-login').show();

    $('#facebook-login').click(fbLogin);
  }


});

