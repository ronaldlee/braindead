

chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  //chrome.tabs.executeScript(null, {file: "libs/fb.js"});
  chrome.tabs.executeScript(null, {file: "libs/sdk.js"});
  chrome.tabs.insertCSS(null, {file: "libs/jquery-ui.css"});
  chrome.tabs.insertCSS(null, {file: "stylesheets/braindead.css"});
  chrome.tabs.executeScript(null, {file: "libs/jquery.min.js"});
  chrome.tabs.executeScript(null, {file: "libs/jquery-ui.min.js"});
  chrome.tabs.executeScript(null, {file: "libs/jquery.loadTemplate-1.4.5.min.js"});
  chrome.tabs.executeScript(null, {file: "libs/backbone-min.js"});

  /*
  chrome.tabs.query({active:true}, function(tab) {
    console.log("tab url: " + tab[0].url);
    sendResponse({tab: tab[0].url});
  });
  */

  //alert('taaa url: ' + tab.url);

  var tabUrl = tab.url;


  //execute script which injected the iframe of the main app

  //must call this to insert js in tab's page
  chrome.tabs.executeScript(null, {
        code: 'var tabUrl = "' +tabUrl+'"; var tabid = "'+tab.id+'"; '
  }, function() {
    chrome.tabs.executeScript(null, {file: "braindead.js"}, function() { 
      //absolutely need the 'tab.id' here!!
      //chrome.tabs.sendMessage(tab.id, 'whatever value; String, object, whatever');
    });
  
  } );


});




