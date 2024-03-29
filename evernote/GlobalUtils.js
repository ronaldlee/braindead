var GlobalUtils = {};
(function() {
      GlobalUtils.NOTEBOOK_TYPE_PERSONAL = 1;
          GlobalUtils.NOTEBOOK_TYPE_LINKED = 2;
              GlobalUtils.NOTEBOOK_TYPE_BUSINESS = 3;
                  var l = /^(.*?):\/\/((www\.)?(.*?))(:\d+)?(\/.*?)(\?.*)?$/;
                      GlobalUtils.componentizeUrl = function(a) {
                                var b = {
                                              protocol: null,
              domain: null,
              domainNoWww: null,
              port: null,
              path: null,
              queryString: null
          };
                                        a = l.exec(a);
                                                b.protocol = a[1];
                                                        b.domain = a[2];
                                                                b.domainNoWww = a[4];
                                                                        b.port = a[5];
                                                                                b.path = a[6];
                                                                                        b.queryString = a[7];
                                                                                                return b
                                                                                                      };
                          GlobalUtils.localize = function(a) {
                                    var b = a.nodeName.toLowerCase();
                                            if ("input" == b || "textarea" ==
                                                            b) switch (a.type) {
                                                                          case "text":
                                                                                            a.attributes.placeholder && (b = Browser.i18n.getMessage(a.attributes.placeholder.value)) && (a.placeholder = b);
                                                                                                        case "textarea":
                                                                                                        case "button":
                                                                                                        case "submit":
                                                                                                        case "search":
                                                                                                            a.attributes.placeholder && (b = Browser.i18n.getMessage(a.attributes.placeholder.value)) && (a.placeholder = b);
                                                                                                                            a.attributes.message && (b = Browser.i18n.getMessage(a.attributes.message.value)) && (a.value = b);
                                                                                                                                            break;
                                                                                                                                                        case "checkbox":
                                                                                                                                                        case "password":
                                                                                                                                                        case "hidden":
                                                                                                                                                        case "radio":
                                                                                                                                                            break;
                                                                                                                                                                        default:
                                                                                                                                                                            throw Error("We need to localize the value of input elements.");
                                                                                                                                                                                    } else a.attributes.message && (b = Browser.i18n.getMessage(a.attributes.message.value)) && (a.innerHTML = b);
                                                    a.title && (b = Browser.i18n.getMessage(a.title)) && (a.title = b);
                                                            for (b = 0; b < a.children.length; b++) GlobalUtils.localize(a.children[b])
                                                                  };
                              GlobalUtils.getQueryParams = function(a) {
                                        var b = GlobalUtils.componentizeUrl(a).queryString;
                                                a = {};
                                                        if (!b) return a;
                                                                var b = b.substr(1),
                                                                              b = b.split("#")[0],
                                                                                            b = b.split("&"),
                                                                                                        c;
                                                                        for (c = 0; c < b.length; c++) {
                                                                                      var d = b[c].split("=");
                                                                                                  d[1] && (d[1] = d[1].replace(/\+/g, " "));
                                                                                                              a[d[0].toLowerCase()] = d[1]
                                                                                                                        }
                                                                                return a
                                                                                      };
                                  GlobalUtils.escapeXML = function(a) {
                                            return a.replace(/&|<|>|"|'/g, function(a) {
                                                            if ("&" == a) return "&amp;";
                                                                        if ("<" == a) return "&lt;";
                                                                                    if (">" == a) return "&gt;";
                                                                                                if ('"' == a) return "&quot;";
                                                                                                            if ("'" == a) return "&apos;"
                                                                                                                    })
                                                };
                                      GlobalUtils.unescapeXML = function(a) {
                                                return a.replace(/&(amp|lt|gt|quot|apos);/g, function(a) {
                                                              if ("&amp;" == a) return "&";
                                                                          if ("&lt;" == a) return "<";
                                                                                      if ("&gt;" == a) return ">";
                                                                                                  if ("&quot;" == a) return '"';
                                                                                                              if ("&apos;" == a) return "'"
                                                          })
                                                    };
                                          GlobalUtils.getNoteURI = function(a, b, c, d) {
                                                    return a + "/SetAuthToken.action?auth=" + encodeURIComponent(d) +
                                                                  "&targetUrl=" + encodeURIComponent("/shard/" + b.shardId + "/nl/" + c + "/" + b.noteGuid + "/")
                                                                      };
                                              GlobalUtils.buildGoogleRegEx = function() {
                                                        for (var a = ".com .ad .ae .com.af .com.ag .com.ai .am .co.ao .com.ar .as .at .com.au .az .ba .com.bd .be .bf .bg .com.bh .bi .bj .com.bn .com.bo .com.br .bs .co.bw .by .com.bz .ca .cd .cf .cg .ch .ci .co.ck .cl .cm .cn .com.co .co.cr .com.cu .cv .com.cy .cz .de .dj .dk .dm .com.do .dz .com.ec .ee .com.eg .es .com.et .fi .com.fj .fm .fr .ga .ge .gg .com.gh .com.gi .gl .gm .gp .gr .com.gt .gy .com.hk .hn .hr .ht .hu .co.id .ie .co.il .im .co.in .iq .is .it .je .com.jm .jo .co.jp .co.ke .com.kh .ki .kg .co.kr .com.kw .kz .la .com.lb .li .lk .co.ls .lt .lu .lv .com.ly .co.ma .md .me .mg .mk .ml .mn .ms .com.mt .mu .mv .mw .com.mx .com.my .co.mz .com.na .com.nf .com.ng .com.ni .ne .nl .no .com.np .nr .nu .co.nz .com.om .com.pa .com.pe .com.ph .com.pk .pl .pn .com.pr .ps .pt .com.py .com.qa .ro .ru .rw .com.sa .com.sb .sc .se .com.sg .sh .si .sk .com.sl .sn .so .sm .st .com.sv .td .tg .co.th .com.tj .tk .tl .tm .tn .to .com.tr .tt .com.tw .co.tz .com.ua .co.ug .co.uk .com.uy .co.uz .com.vc .co.ve .vg .co.vi .com.vn .vu .ws .rs .co.za .co.zm .co.zw .cat".split(" "),
                                                                            b = 0; b < a.length; b++) a[b] = a[b].replace(/\./g, "\\.");
                                                                return RegExp("^https?://www.google(" + a.join("|") + ")/", "i")
                                                                      };
                                                  GlobalUtils.removePunctuation = function(a) {
                                                            return a.replace(RegExp("-|_|\u2013|\u2014|\u00b7|\\(|\\)|\\[|\\]|\\{|\\}|\u300a|\u300b|\uff08|\uff09|\u3010|\u3011|\u300c|\u300d|\u00bb|\\.|!|:|;|\"|'|,|\\?|\u3002|\u3001|\uff01|\uff0c|\uff1a|\u2026|\u201c|\u201d|@|#|\\$|%|\\^|&|\\*|\\+|=|`|~|/|\\\\|\\||>|<|\u25cf", "g"), " ")
                                                                  };
                                                      GlobalUtils.setupCache = function(a, b, c) {
                                                                return function() {
                                                                              function d(a,
                                                                                                  b, d) {
                                                                                                                    IDB.deleteGroup(a, b, "timestamp", IDBKeyRange.upperBound(new Date(new Date - c), !0), d, function(a) {
                                                                                                                                          log.error(a)
                                                                                                                                      })
                                                                                                                                }
                                                                                          a.get = function(b, c, k, g) {
                                                                                                            d(b, c + a.idbStoreSuffix, function() {
                                                                                                                                  IDB.get(b, c + a.idbStoreSuffix, k, function(a) {
                                                                                                                                                            g(a)
                                                                                                                                                        }, function(a) {
                                                                                                                                                                                  log.error(a)
                                                                                                                                                        })
                                                                                                                                                  })
                                                                                                                        };
                                                                                                      a.add = function(c, f, k, g) {
                                                                                                                        d(c, f + a.idbStoreSuffix, function() {
                                                                                                                                              g.timestamp = new Date;
                                                                                                                                                                  IDB.set(c, f + a.idbStoreSuffix, k, g, function() {
                                                                                                                                                                                            IDB.getGroup(c, f + a.idbStoreSuffix, null, null, function(d) {
                                                                                                                                                                                                                          if (d && d.length > b) {
                                                                                                                                                                                                                                                            for (var g, h = 0; h < d.length; h++)
                                                                                                                                                                                                                                  if (!g || d[h].timestamp < g) g =
                                                                                                                                                                                                                                      d[h].timestamp;
                                                                                                                                                                                                                            IDB.deleteGroup(c, f + a.idbStoreSuffix, "timestamp", g, function() {})
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                  })
                                                                                                                                                                                                                })
                                                                                                                                                                                  }, function(a) {
                                                                                                                                                                                                        log.error(a)
                                                                                                                                          })
                                                                                                                                    }
                                                                                                              }
                                                                    };
                                                          GlobalUtils.removeControlCharacters = function(a) {
                                                                    return a ? a.replace(/[\u0000-\u0008\u000B-\u001F\u0080-\u009F\uFFF0-\uFFFF]/g, "") : a
                                                                          };
                                                              GlobalUtils.createTitleAndLinkPortionOfUrlClipContent = function(a, b) {
                                                                        var c = a ? a : Browser.i18n.getMessage("quickNote_untitledNote"),
                                                                                        d = document.createElement("div");
                                                                                d.style.whiteSpace = "nowrap";
                                                                                        var e = document.createElement("div");
                                                                                                e.textContent = c;
                                                                                                        e.style.fontFamily =
                                                                                                                      "Helvetica, Arial, sans-serif";
                                                                                                                e.style.fontSize = "14px";
                                                                                                                        e.style.fontWeight = "bold";
                                                                                                                                e.style.color = "#0C0C0C";
                                                                                                                                        e.style.overflowX = "hidden";
                                                                                                                                                e.style.textOverflow = "ellipsis";
                                                                                                                                                        e.style.paddingBottom = "9px";
                                                                                                                                                                d.appendChild(e);
                                                                                                                                                                        c = document.createElement("div");
                                                                                                                                                                                c.style.borderTop = "1px solid #D8D8D8";
                                                                                                                                                                                        c.style.height = "0px";
                                                                                                                                                                                                c.style.width = "100%";
                                                                                                                                                                                                        d.appendChild(c);
                                                                                                                                                                                                                c = document.createElement("div");
                                                                                                                                                                                                                        c.style.display = "inline-block";
                                                                                                                                                                                                                                c.style.verticalAlign = "top";
                                                                                                                                                                                                                                        c.style.margin = "15px 0px 0px 0px";
                                                                                                                                                                                                                                                c.style.width = "364px";
                                                                                                                                                                                                                                                        d.appendChild(c);
                                                                                                                                                                                                                                                                e = document.createElement("div");
                                                                                                                                                                                                                                                                        e.style.fontFamily = "Helvetica, Arial, sans-serif";
                                                                                                                                                                                                                                                                                e.style.fontSize = "12px";
                                                                                                                                                                                                                                                                                        e.style.color = "#0C0C0C";
                                                                                                                                                                                                                                                                                                e.style.display = "block";
                                                                                                                                                                                                                                                                                                        c.appendChild(e);
                                                                                                                                                                                                                                                                                                                var f = document.createElement("a");
                                                                                                                                                                                                                                                                                                                        f.href = b;
                                                                                                                                                                                                                                                                                                                                f.textContent = b;
                                                                                                                                                                                                                                                                                                                                        f.style.display = "inline-block";
                                                                                                                                                                                                                                                                                                                                                f.style.textDecoration = "none";
                                                                                                                                                                                                                                                                                                                                                        f.style.whiteSpace = "nowrap";
                                                                                                                                                                                                                                                                                                                                                                f.style.overflow = "hidden";
                                                                                                                                                                                                                                                                                                                                                                        f.style.textOverflow = "ellipsis";
                                                                                                                                                                                                                                                                                                                                                                                f.style.color = "#0C0C0C";
                                                                                                                                                                                                                                                                                                                                                                                        f.style.width = "345px";
                                                                                                                                                                                                                                                                                                                                                                                                e.appendChild(f);
                                                                                                                                                                                                                                                                                                                                                                                                        return {
                                                                                                                                                                                                                                                                                                                                                                                                                      content: d,
                                                                                                                                                                                                                                                                                                                                                                                                                                    textPortion: c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                link: e,
                                                                                                                                                                                                                                                                                                                                                                                                                                                            url: f
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                            };
                                                                  GlobalUtils.parseOperatingSystem =
                                                                            function(a) {
                                                                                          try {
                                                                                                            if (/Windows/i.test(a)) switch (/Windows NT (.+)/.exec(a)[1]) {
                                                                                                                                  case "3.1":
                                                                                                                                                            return "Windows NT 3.1";
                                                                                                                                                                                case "3.5":
                                                                                                                                                                                    return "Windows NT 3.5";
                                                                                                                                                                                                        case "3.51":
                                                                                                                                                                                                            return "Windows NT 3.51";
                                                                                                                                                                                                                                case "4.0":
                                                                                                                                                                                                                                    return "Windows NT 4.0";
                                                                                                                                                                                                                                                        case "5.0":
                                                                                                                                                                                                                                                            return "Windows 2000";
                                                                                                                                                                                                                                                                                case "5.01":
                                                                                                                                                                                                                                                                                    return "Windows 2000 SP1";
                                                                                                                                                                                                                                                                                                        case "5.1":
                                                                                                                                                                                                                                                                                                            return "Windows XP";
                                                                                                                                                                                                                                                                                                                                case "5.2":
                                                                                                                                                                                                                                                                                                                                    return "Windows XP x64";
                                                                                                                                                                                                                                                                                                                                                        case "6.0":
                                                                                                                                                                                                                                                                                                                                                            return "Windows Vista";
                                                                                                                                                                                                                                                                                                                                                                                case "6.1":
                                                                                                                                                                                                                                                                                                                                                                                    return "Windows 7";
                                                                                                                                                                                                                                                                                                                                                                                                        case "6.2":
                                                                                                                                                                                                                                                                                                                                                                                                            return "Windows 8";
                                                                                                                                                                                                                                                                                                                                                                                                                                case "6.3":
                                                                                                                                                                                                                                                                                                                                                                                                                                    return "Windows 8.1";
                                                                                                                                                                                                                                                                                                                                                                                                                                                        default:
                                                                                                                                                                                                                                                                                                                                                                                                                                                            return "Windows"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if (/Mac OS X/i.test(a)) return "Mac " +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              /OS X (.+)/.exec(a)[1].replace(/_/g, ".");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        if (/CrOS/i.test(a)) return "Chrome OS " + /CrOS (.+)/.exec(a)[1];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (/Linux/i.test(a) || /FreeBSD/i.test(a)) return a
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                            return null
                                                                                                                                          } catch (b) {
                                                                                                                                                            return null
                                                                                                                                                                          }
                                                                                                  };
                                                                      GlobalUtils.generateSystemInfo = function() {
                                                                                var a;
                                                                                        a = SAFARI ? "Safari " + /Version\/(.+?)(\s|$)/.exec(navigator.userAgent)[1] : OPERA ? "Opera " + /OPR\/(.+?)(\s|$)/.exec(navigator.userAgent)[1] + "/" + /Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1] : YANDEX ? "Yandex " + /YaBrowser\/(.+?)(\s|$)/.exec(navigator.userAgent)[1] + "/" + /Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1] :
                                                                                                      "Chrome " + /Chrome\/(.+?)(\s|$)/.exec(navigator.userAgent)[1];
                                                                                                var b, c = /\((.+?)\)/g,
                                                                                                                d = c.exec(navigator.userAgent);
                                                                                                        a: for (; d;) {
                                                                                                                      for (var d = d[1].split(/;\s?/), e = 0; e < d.length; e++)
                                                                                                                                        if (b = GlobalUtils.parseOperatingSystem(d[e])) break a;
                                                                                                                                  d = c.exec(navigator.userAgent)
                                                                                                                                            }
                                                                                                                   b || (b = "Unknown OS");
                                                                                                                           a || (a = "Unknown browser");
                                                                                                                                   return {
                                                                                                                                                 browser: a,
                                                                                                                                                               os: b
                                                                                                                                                                         }
                                                                                                                                       };
                                                                          Object.preventExtensions(GlobalUtils)
})();
