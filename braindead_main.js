Parse.initialize("Ga3gF3LIgw8nSXtygi7fodmlehYPT7vc5gdyPnuz", "n3TQpqA2CqUXBSGysKHDQZGENIiy8SYOcpqRpB6j");

var tabUrl;

var FBUser = {
  userID: undefined,
  accessToken: undefined,
  firstName: undefined,
  lastName: undefined,
  name: undefined,
  gender: undefined,
  hometown: undefined
}

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
  console.log('fbLogin');

  /*
  elt = document.createElement('iframe');
  elt.id = 'facebook_load_frame';
  elt.src = 'http://54.149.101.128/braindead/iframe.html';
  document.getElementsByTagName('body')[0].appendChild(elt);
  */

  Parse.FacebookUtils.logIn('email,first_name,last_name,name,gender,hometown', {
    success: function(user) {
      if (!user.existed()) {
        alert("User signed up and logged in through Facebook!");
      } else {
        alert("User logged in through Facebook!");
      }
    },
    error: function(user, error) {
      alert("User cancelled the Facebook login or did not fully authorize.");
    }
  });
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
  /*
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
  */
}

function loginUser() {

  /*
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
  */
}

function showLoginPanel() {
    //show the signup or login page
    
    //$('#login-button').click(loginUser);
    //$('#signup-button').click(signupUser);

    $('#facebook-login').click(fbLogin);
    $('#braindead-login').show();
}

function showMainPanel() {
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

    $('#braindead-tabs-3').loadTemplate(chrome.extension.getURL("/templates/braindead_config_tab.html"), {},
      {
        success: function() {
        }
      }
    );

    $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

    $("#braindead-main").tabs();

    $('#fb-share-button').click(fbShare);
}

function setupListenerForExternalIframeActions() {
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
    console.log("get message: connectStatus: "  + e.data.connectStatus);
    var data = e.data;

    console.log(data);

    //This is the data from the Facebook SDK
    if (data.connectStatus === 'connected') { //connected and authorized, retrieve the user id and access token
      FBUser.userID      = data.userID;
      FBUser.accessToken = data.accessToken;
      FBUser.firstName   = data.fbFirstName;
      FBUser.lastName    = data.fbLastName;
      FBUser.name        = data.fbName;
      FBUser.gender      = data.fbGender;
      FBUser.hometown    = data.fbHometown;

      //can show the app main content
      showMainPanel();

      /*
      console.log("Connection status: " + data.connectStatus + "; UserID: " + data.userID + "; AccessToken: " + data.accessToken + 
                  "; firstname: " + fbFirstName + "; lastname: " + fbLastName + 
                  "; fbName: " + fbName + "; gender: " + fbGender +
                  "; hometown: " + fbHometown);
      */            
    }
    else if (data.connectStatus === 'not_authorized') { //connected but not authorized, display login icon
      //display login popup
      fbLogin();
    }
    else { //not connected at all, show login button too
      showLoginPanel();
    }
  },false);
}

$( document ).ready(function() {
  setupListenerForExternalIframeActions();
  
  //====
  /*
  FB.init({
    appId      : '1544469515798401',
    xfbml      : true,
    version    : 'v2.1'
  });
  */

  var isTest = false;
  var isForceShowLogin = false;

  //Parse.User.logOut();

  /*
  var currentUser = Parse.User.current();
  if (!isForceShowLogin && (currentUser || isTest)) {
    $('#braindead-main-container').show();

    console.log("parse user: ");
    console.log(currentUser);

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

    $('#braindead-tabs-3').loadTemplate(chrome.extension.getURL("/templates/braindead_config_tab.html"), {},
      {
        success: function() {
        }
      }
    );

    $('#braindead-bottom').loadTemplate(chrome.extension.getURL("/templates/braindead_bottom.html"));

    $("#braindead-main").tabs();

    $('#fb-share-button').click(fbShare);

  } else {
    //show the signup or login page
    
    //$('#login-button').click(loginUser);
    //$('#signup-button').click(signupUser);

    $('#facebook-login').click(fbLogin);
    $('#braindead-login').show();
  }
  */

});

