function NoteSnippets(p, l, u, v, n, w, q, m) {
      function r(a, e) {
                a && (h = a);
                        k = e;
                                h && 0 != h.length && s(h)
                                      }

          function s(a) {
                    var e = p;
                            if (e) {
                                          e.innerHTML = "";
                                                      var b, c;
                                                                  for (c in a) {
                                                                                    q || 0 != c % 3 || (b = document.createElement("div"), b.className = "row", e.appendChild(b));
                                                                                                    var f = document.createElement("div");
                                                                                                                    f.className = "container";
                                                                                                                                    f.appendChild(x(a[c], c));
                                                                                                                                                    var d;
                                                                                                                                                                    d = a[c];
                                                                                                                                                                                    if (d.contact || d.notebookName) {
                                                                                                                                                                                                          t = !0;
                                                                                                                                                                                                                              var g = document.createElement("div");
                                                                                                                                                                                                                                                  g.className = d.contact ? "contactName" : "notebookName";
                                                                                                                                                                                                                                                                      g.innerText = d.contact || d.notebookName;
                                                                                                                                                                                                                                                                                          g.title = g.innerText;
                                                                                                                                                                                                                                                                                                              d = g
                                                                                                                                                                                                                                                                                                                                } else d = null;
                                                                                                                                                                                                    d && f.appendChild(d);
                                                                                                                                                                                                                    q ? e.appendChild(f) : b.appendChild(f)
                                                                                                                                                                                                                                  }
                                                                              k && k > a.length && e.appendChild(y())
                                                                                        }
                                }

              function y() {
                        var a = k - h.length,
                                        a = 1 == a ? Browser.i18n.getMessage("popup_oneMoreNoteLink") : Browser.i18n.getMessage("popup_moreNotesLink", [a]),
                                                    e = document.createElement("div");
                                e.className = "moreOnServer";
                                        e.addEventListener("click", function() {
                                                      Browser.sendToExtension({
                                                                        name: "main_recordActivity"
                                                                    });
                                                                  var a = l + "/SetAuthToken.action?auth=" + encodeURIComponent(n.pers) + "&targetUrl=" + encodeURIComponent("/Home.action#x=" +
                                                                                    w);
                                                                              Browser.sendToExtension({
                                                                                                name: "main_openTab",
                                                                                                url: a
                                                                                            })
                                                                                      });
                                                e.innerHTML = a;
                                                        return e
                                                              }

                  function z(a) {
                            var e = navigator.language,
                                            b = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                                                        c = new Date;
                                    if (a.getMonth() === c.getMonth() && a.getDate() === c.getDate() && a.getFullYear() === c.getFullYear()) return Browser.i18n.getMessage("Today");
                                            if (6048E5 >= c.valueOf() - a.valueOf() && c.getDay() !== a.getDay()) return Browser.i18n.getMessage(b[a.getDay()]);
                                                    b = "%day %monthName %year";
                                                            c = a.getDate();
                                                                    e.match(/en-us/i) &&
                                                                                  (b = "%monthName %day, %year", c = 1 == c || 21 == c || 31 == c ? c + "st" : 2 == c || 22 == c ? c + "nd" : 3 == c || 23 == c ? c + "rd" : c + "th");
                                                                            e.match(/^zh/i) ? b = "%year\u5e74%month\u6708%day\u65e5" : e.match(/^ja/i) && (b = "%year\u5e74%monthName%day\u65e5");
                                                                                    b = b.replace(/%day/, c);
                                                                                            b = b.replace(/%year/, a.getFullYear());
                                                                                                    b = b.replace(/%monthName/, Browser.i18n.getMessage("Jan Feb March April May June July Aug Sept Oct Nov Dec".split(" ")[a.getMonth()]));
                                                                                                            return b = b.replace(/%month/, a.getMonth() + 1)
                                                                                                                  }

                      function x(a, e) {
                                var b, c = document.createElement("div"),
                                                f = document.createElement("a");
                                        f.className = "noteLink";
                                                "expert" == a.type ? (c.className = "expert", f.target = "_parent", f.href = "evernote://business/user/" + a.id, c.addEventListener("click", function() {
                                                              Browser.sendToExtension({
                                                                                name: "main_recordActivity"
                                                                            });
                                                                          m && m(!0, !0)
                                                          })) : (c.className = "noteBlock", f.target = "_blank", f.href = GlobalUtils.getNoteURI(l, {
                                                                        shardId: a.shardId || v,
                                                                        noteGuid: a.guid
                                                                    }, u, n.pers), c.addEventListener("click", function() {
                                                                                  Browser.sendToExtension({
                                                                                                    name: "main_recordActivity"
                                                                                                });
                                                                                              m && m(a.inBusinessNotebook)
                                                                              }));
                                                        if ("expert" == a.type) b = document.createElement("img"), b.className = "smallimage", b.setAttribute("guid", a.id), Browser.sendToExtension({
                                                                      name: "downloadThumbnail",
                                                                       guid: a.id,
                                                                       url: l + "/SetAuthToken.action?auth=" + encodeURIComponent(n.pers) + "&targetUrl=" + encodeURIComponent("/user/" + a.id + "/photo?size=60")
                                                                  });
                                                                else if (a.thumbsquare) {
                                                                              var d = 110;
                                                                                          1.5 <= devicePixelRatio && (d *= 2);
                                                                                                      b = document.createElement("img");
                                                                                                                  a.snippet && (d = 60, 1.5 <= devicePixelRatio && (d *= 2), b.className = "smallimage");
                                                                                                                              b.setAttribute("guid", a.guid);
                                                                                                                                          Browser.sendToExtension({
                                                                                                                                                            name: "downloadThumbnail",
                                                                                                                                                            guid: a.guid,
                                                                                                                                                            inBusinessNotebook: a.inBusinessNotebook,
                                                                                                                                                            size: d,
                                                                                                                                                            url: l + a.thumbsquare
                                                                                                                                                        })
                                                                                                                                                  }
                                                                        d = document.createElement("div");
                                                                                d.className = "snippet";
                                                                                        if (a.snippet) {
                                                                                                      var g = document.createElement("p");
                                                                                                                  g.innerHTML = a.snippet;
                                                                                                                              g.className = "snippettext";
                                                                                                                                          a.thumbsquare && (g.className += " mixed")
                                                                                                                                                    }
                                                                                                var h = document.createElement("h1");
                                                                                                        h.textContent = a.title;
                                                                                                                if ("expert" == a.type) d.appendChild(b), b = document.createElement("div"), b.className = "divider", d.appendChild(b), d.appendChild(h), a.role && (b = document.createElement("div"), b.textContent =
                                                                                                                                a.role, b.className = "role", d.appendChild(b)), b = document.createElement("a"), b.className = "seeMoreLink", b.textContent = Browser.i18n.getMessage("seeMore"), d.appendChild(b);
                                                                                                                        else {
                                                                                                                                      var k = document.createElement("p");
                                                                                                                                                  k.textContent = z(new Date(a.updated));
                                                                                                                                                              k.className = "date";
                                                                                                                                                                          d.appendChild(h);
                                                                                                                                                                                      d.appendChild(k);
                                                                                                                                                                                                  a.snippet && d.appendChild(g);
                                                                                                                                                                                                              a.thumbsquare && d.appendChild(b)
                                                                                                                                                                                                                        }
                                                                                                                                c.appendChild(d);
                                                                                                                                        c.appendChild(f);
                                                                                                                                                return c
                                                                                                                                                      }
                          var h, k = 0,
                                      t = !1;
                              r();
                                  this.setNotes = r;
                                      this.show = function() {};
                                          this.renderBlocks = s;
                                              this.hasAtLeastOneNotebookName =
                                                        function() {
                                                                      return t
                                                                                };
                                                  Browser.addMessageHandlers({
                                                            receiveThumbnail: function(a, e, b) {
                                                                          if (e = p.querySelector("img[guid='" + a.guid + "']")) e.src = a.datauri, e.removeAttribute("guid")
                                                            }
                                                                                  });
                                                      Object.preventExtensions(this)
}
Object.preventExtensions(NoteSnippets);
