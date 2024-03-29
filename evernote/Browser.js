var Browser = {
  runIfInTopFrame: function(a) {
    SAFARI ? a() : navigator.userAgent.match(/chrome/i) && a()
  },
  messageListeners: []
};

function initBrowser() {
  Browser.i18n = chrome.i18n;
  Browser.extension = chrome.extension;
  Browser.EVERNOTE_VERSION = "6.2.6";
  Browser.agent = null;
  Browser.keyCombos = {};
  Browser.currentKeys = {};
  Browser.safariPopoverVisibilityCheckInterval = 0;
  Browser.safariBrowserActionClickHelper = function() {
    log.log("do nothing on browser action click - default handler")
  };
  Browser.safariBrowserActionClickHandler = function(a) {
    Browser.safariBrowserActionClickHelper(a)
  };
  SAFARI && safari && safari.application && safari.application.addEventListener("command",
    Browser.safariBrowserActionClickHandler);
  Browser.browserActionOnClickedListeners = [];
  Browser.sendToTab = function(a, b, c) {
    if (SAFARI) try {
      a.page.dispatchMessage(b.name, b)
    } catch (d) {} else chrome.tabs.sendMessage ? chrome.tabs.sendMessage(a.id, b, c) : chrome.tabs.sendRequest(a.id, b, c)
  };
  Browser.sendToExtension = function(a, b) {
    if (SAFARI) safari.self.tab.dispatchMessage(a.name, a);
    else try {
      chrome.runtime && chrome.runtime.sendMessage ? chrome.runtime.sendMessage(a) : chrome.extension && chrome.extension.sendMessage ? chrome.extension.sendMessage(a) :
      chrome.extension.sendRequest(a)
    } catch (c) {
      if (b) b();
      else throw c;
    }
  };
  Browser.getAgent = function() {
    if (Browser.agent) return Browser.agent;
    var a = "Unknown/1.0",
    b = /^Mozilla\/\d+(\.\d+)*\s+\(.*?([^;()]*(Windows|OS X|Linux)[^;()]*).*?\)/i.exec(navigator.userAgent);
    b && b[2] && (a = b[2].trim());
    a = a.replace(/\s+(\S*\d)/, "/$1");
    a = "Evernote Webclipper/" + Browser.EVERNOTE_VERSION + " (" + navigator.language + "); " + a + "; ";
    b = "0.0";
    SAFARI ? (b = navigator.userAgent.replace(/^.*Version\/([0-9.]+).*$/, "$1"), b == navigator.userAgent &&
    (b = "0.0"), a += "Safari/" + b) : (b = navigator.userAgent.replace(/^.*Chrome\/([0-9.]+).*$/, "$1"), b == navigator.userAgent && (b = "0.0"), a += "Chrome/" + b);
    Browser.agent = a + ";";
    return Browser.agent
  };
  Browser.removeMessageHandlers = function() {
    if (SAFARI)
      for (var a = null, a = safari.application ? safari.application : safari.self, b = 0; b < Browser.messageListeners.length; b++) a.removeEventListener("message", Browser.messageListeners[b], !1), console.log("Removing message listener: "), console.log(Browser.messageListeners[b]);
        Browser.messageListeners = []
  };
  Browser.addMessageHandlers = function(a, b) {
    var c;
    if (SAFARI) {
      if ("about:blank" == document.location.href || !b && window && window.parent != window && (c = chrome.extension.getURL(""), document.location.href.substr(0, c.length) != c)) return;
        var d = null;
        if (!safari) {
          log.warn("No 'safari' object.");
          return
        }
      d = safari.application ? safari.application : safari.self;
      c = function(b) {
        if (b.name && a[b.name]) a[b.name](b.message, {
          tab: b.target
        }, null)
      };
      d.addEventListener("message", c, !1)
    } else c = function(b, c, d) {
      if (!c || c.id !== chrome.i18n.getMessage("@@extension_id") &&
          c.sender && c.sender.id !== chrome.i18n.getMessage("@@extension_id")) log.warn("Got request from unexpected sender. Ignoring.");
      else {
        if (b.name && a[b.name]) a[b.name](b, c, d);
        if (d) return !0
      }
    }, chrome.extension.onMessage ? chrome.extension.onMessage.addListener(c) : chrome.extension.onRequest.addListener(c);
    Browser.messageListeners.push(c)
  };
  Browser.addKeyboardHandlers = function(a) {
    for (var b in a) Browser.keyCombos[b] = a[b]
  };
  Browser.handleKeys = function(a) {
    var b = [],
    c;
    for (c in Browser.currentKeys) b.push(parseInt(c));
      b.sort(function(a, b) {
        return a - b
      });
    b = b.join(" + ");
    if (Browser.keyCombos[b]) Browser.keyCombos[b](b, a);
    Browser.currentKeys = {}
  };
  Browser.setIcon = function(a) {
    if (SAFARI)
      for (var b in safari.extension.toolbarItems) {
        var c = safari.extension.toolbarItems[b];
        "clipper" == c.identifier && (c.image = safari.extension.baseURI + a + "-16x16.png")
      } else chrome.browserAction.setIcon({
        path: {
          19: chrome.extension.getURL(a + "-19x19.png"),
          38: chrome.extension.getURL(a + "-19x19@2x.png")
        }
      })
  };
  Browser.setTitle = function(a) {
    if (SAFARI)
      for (var b in safari.extension.toolbarItems) {
        var c =
        safari.extension.toolbarItems[b];
        "clipper" == c.identifier && (c.toolTip = a)
      } else chrome.browserAction.setTitle({
        title: a
      })
  };
  Browser.setBrowserActionClickHandler = function(a) {
    SAFARI ? Browser.safariBrowserActionClickHelper = function(b) {
      if ("clipper" == b.command)
      for (var c = safari.extension.toolbarItems, d = 0; d < c.length; d++)
        if ("clipper" == c[d].identifier) {
          a(b.target.browserWindow.activeTab);
          break
        }
    } : chrome.browserAction.onClicked && !chrome.browserAction.onClicked.hasListener(a) && (Browser.browserActionOnClickedListeners.push(a),
        chrome.browserAction.onClicked.addListener(a))
  };
  Browser.removeBrowserActionClickHandler = function(a) {
    if (SAFARI) Browser.safariBrowserActionClickHelper = function() {
      log.log("do nothing on browser action click - removed handler")
      };
    else if (chrome.browserAction.onClicked) {
      a || (a = Browser.browserActionOnClickedListeners[0] ? Browser.browserActionOnClickedListeners[0] : null);
      var b = Browser.browserActionOnClickedListeners.indexOf(a); - 1 < b && Browser.browserActionOnClickedListeners.splice(b, 1);
      chrome.browserAction.onClicked.removeListener(a)
    }
  };
  Browser.insertJS = function(a, b) {
    SAFARI ? (safari.extension.addContentScriptFromURL(safari.extension.baseURI + a), b && b()) : b ? chrome.tabs.executeScript(null, {
        file: a
      }, b) : chrome.tabs.executeScript(null, {
        file: a
      })
  };
  Browser.insertCSS = function(a, b) {
    SAFARI ? (safari.extension.addContentStyleSheetFromURL(safari.extension.baseURI + a), b && b()) : b ? chrome.tabs.insertCSS(null, {
        file: a
      }, b) : chrome.tabs.insertCSS(null, {
        file: a
      })
  };
  Browser.captureVisibleTab = function(a, b) {
      SAFARI ? a.visibleContentsAsDataURL(b) : chrome.tabs.captureVisibleTab(a.windowId, {
        format: "png"
      }, b)
  };
  Browser.getCurrentTab = function(a) {
      SAFARI ? a(safari.application.activeBrowserWindow.activeTab) : chrome.tabs.query({
        active: !0,
        currentWindow: !0
        }, function(b) {
          b && 0 < b.length ? a(b[0]) : (log.warn("chrome tabs query did not return a result while getting current tab"), a())
        })
  };
  Browser.getAllTabs = function(a) {
    if (SAFARI) {
      for (var b = safari.application.browserWindows, c = [], d = 0; d < b.length; d++)
        for (var e = 0; e < b[d].tabs.length; e++) c.push(b[d].tabs[e]);
          a(c)
    } else chrome.tabs.query({}, a)
  };
  Browser.setPopup = function(a) {
    SAFARI ?
    "" == a.trim() ? safari.extension.toolbarItems[0].popover && (safari.extension.toolbarItems[0].popover.visible ? Browser.safariPopoverVisibilityCheckInterval = setInterval(function() {
      safari.extension.toolbarItems[0].popover ? safari.extension.toolbarItems[0].popover.visible || (clearInterval(Browser.safariPopoverVisibilityCheckInterval), safari.extension.toolbarItems[0].popover = null, safari.extension.removePopover("clipper")) : clearInterval(Browser.safariPopoverVisibilityCheckInterval)
     }, 1500) : (safari.extension.toolbarItems[0].popover =
     null, safari.extension.removePopover("clipper"))) : (safari.extension.toolbarItems[0].popover && (safari.extension.toolbarItems[0].popover.hide(), safari.extension.toolbarItems[0].popover = null), safari.extension.removePopover("clipper"), safari.extension.toolbarItems[0].popover = safari.extension.createPopover("clipper", safari.extension.baseURI + a), Browser.safariBrowserActionClickHelper = function(a) {
     "clipper" == a.command && safari.extension.toolbarItems[0].showPopover()
     }) : chrome.browserAction.setPopup({
       popup: a
     })
  };
  Browser.closeTab = function(a) {
    SAFARI ? a.close() : chrome.tabs.remove(a.id)
  };
  window.addEventListener("keydown", function(a) {
    189 == a.keyCode && a.altKey ? Browser.currentKeys[76] = a : 188 == a.keyCode && a.altKey ? Browser.currentKeys[80] = a : 190 == a.keyCode && a.altKey ? Browser.currentKeys[88] = a : Browser.currentKeys[a.keyCode] = a
  });
  window.addEventListener("keyup", function(a) {
    Browser.handleKeys(a.srcElement)
  });
  Object.preventExtensions(Browser)
}
Browser.runIfInTopFrame(initBrowser);
