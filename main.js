
/*
var Braindead = {

  showInputPanel: function() {
    console.log("calling show input panel");
    $('body').append('<div>BOOO</div>');
  },
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  alert('yoo');
  //Braindead.showInputPanel();
});
*/

//chrome.tabs.executeScript(null, {file: "jquery.min.js"});

chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.insertCSS(null, {file: "libs/jquery-ui.css"});
//  chrome.tabs.insertCSS(null, {file: "stylesheets\braindead.css"});
  chrome.tabs.insertCSS(null, {file: "stylesheets/braindead.css"});
  chrome.tabs.executeScript(null, {file: "libs/jquery.min.js"});
  chrome.tabs.executeScript(null, {file: "libs/jquery-ui.min.js"});
  chrome.tabs.executeScript(null, {file: "libs/jquery.loadTemplate-1.4.5.min.js"});
  chrome.tabs.executeScript(null, {file: "braindead.js"});
  /*
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  */
});
