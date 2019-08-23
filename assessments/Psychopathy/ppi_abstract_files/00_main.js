/**
 * Created by Zohaib Khan on 12/2/2015.
 */

var CwZ = window['CwZ'];
var CWPDFReader = window['CWPDFReader'] || {followAuth: noop};
var pubdoi;
var dataStore = {};

var CWAuthorTip = function (doi) {
    pubdoi = doi;
    var _authorList = [];
    var indexedAuthorList = {};
    var target = undefined;
    var xhrInstance;
    var mouseIn = false;

    function _init() {
        indexedAuthorList = _authorList;
        // registerEvents();
        AuthorTipUtils.CWComApi.init();
    }

    function _setPopupPosition(target, mouseEvent) {
        var elem = CwZ("#auProfNewUI");
        CwZ("#auProfNewUI .tab-container a").on("click", function (e) {//toggle tabs
            CwZ(".tab-container a").removeClass("selected");
            CwZ(this).addClass("selected");
            CwZ(".auth-main-container [data-tab]").hide();
            CwZ(".auth-main-container [data-tab='" + CwZ(this).attr("data-tab") + "']").show();
        });

        CwZ(".cw-follow").on("click", function (e) {
            var authId = CwZ(this).attr("data-id");
            (CWPDFReader.followAuth || function () {
            })(authId);
        });

        var pos = _getPopPosCustom(target, mouseEvent);
        elem.css("top", pos.top + "px");
        elem.css("left", pos.left + "px");
        _setPopupTip(pos.tip);
    }

    function _getPopPosCustom(target, mouseEvent) {
        var pos = {tip: {}};
        var frame = CwZ("#auProfNewUI");
        var verticalThreshold = 5,
            horizontalThreshold = (CwZ(target).outerWidth() / 2) + (frame.outerWidth() / 2);
        var newHorizontalThreshold = 5,
            newVerticalThreshold = 50;

        var targetRight = CwZ(target)[0].getBoundingClientRect().right;
        var targetLeft = CwZ(target)[0].getBoundingClientRect().left;
        var targetTop = CwZ(target)[0].getBoundingClientRect().top;
        var targetBottom = CwZ(target)[0].getBoundingClientRect().bottom;
        var tipHeight = CwZ("#auProfNewUI .tooltip-pointer").outerHeight();

        if (target.height() > 20) { //case when link split in two lines
            var rect = CwZ(target)[0].getClientRects();
            if (mouseEvent.clientX < window.innerWidth / 2) {
                rect = rect[rect.length - 1];
            }
            else {
                rect = rect[0];
            }
            targetRight = rect.right;
            targetLeft = rect.left;
            targetTop = rect.top;
            targetBottom = rect.bottom;
        }

        if ((targetRight + frame.outerWidth()) < window.innerWidth) { //show it on right side
            pos.left = targetRight + newHorizontalThreshold + (window.scrollX || document.documentElement.scrollLeft);

            pos.tip.cls = "dir-left";

            if (targetTop - frame.outerHeight() + newVerticalThreshold > 0) {
                pos.top = targetTop - frame.outerHeight() + (window.scrollY || document.documentElement.scrollTop) + newVerticalThreshold;
                pos.tip.top = targetTop + (window.scrollY || document.documentElement.scrollTop) - pos.top - (tipHeight / 2);
            }
            else if (targetTop < newVerticalThreshold) { //if it is on edge lets check if we can show on top or bottom
                if (targetTop - frame.outerHeight() > 0) { // show on top
                    pos.left = targetRight - (frame.outerWidth() / 2) - (window.scrollX || document.documentElement.scrollLeft);
                    pos.tip.cls = "dir-bottom";
                    pos.tip.left = (targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (target.outerWidth() / 2) - pos.left - 20;
                }
                else if (targetBottom + frame.outerHeight() < window.innerHeight) { // show on bottom
                    pos.left = CwZ(target)[0].getBoundingClientRect().left - frame.outerWidth() + horizontalThreshold + (window.scrollX || document.documentElement.scrollLeft);
                    pos.tip.cls = "dir-top";
                    pos.tip.left = (targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (target.outerWidth() / 2) - pos.left - 20;
                }
                else {
                    pos.top = (window.scrollY || document.documentElement.scrollTop) - newVerticalThreshold;
                    pos.tip.top = targetTop + (window.scrollY || document.documentElement.scrollTop) - pos.top - (tipHeight / 2);
                }
            }
            else {
                pos.top = newVerticalThreshold + (window.scrollY || document.documentElement.scrollTop);
                pos.tip.top = targetTop + (window.scrollY || document.documentElement.scrollTop) - pos.top - (tipHeight / 2);
            }
        }
        else if (targetLeft - frame.outerWidth() > 0) { // show on left side
            pos.left = targetLeft - frame.outerWidth() - (newHorizontalThreshold + 15) + (window.scrollX || document.documentElement.scrollLeft);
            pos.tip.cls = "dir-right";

            if (targetTop - frame.outerHeight() - (window.scrollY || document.documentElement.scrollTop) - newVerticalThreshold > 0) {
                pos.top = targetTop - frame.outerHeight() - (window.scrollY || document.documentElement.scrollTop) + newVerticalThreshold;
            }
            else if (targetTop < newVerticalThreshold) { //if it is on edge lets check if we can show on top or bottom
                if (targetTop - frame.outerHeight() > 0) { // show on top
                    pos.left = targetRight - (frame.outerWidth() / 2) - (window.scrollX || document.documentElement.scrollLeft);
                    pos.tip.cls = "dir-bottom";
                    pos.tip.left = (targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (target.outerWidth() / 2) - pos.left - 20;
                }
                else if (targetBottom + frame.outerHeight() < window.innerHeight) { // show on bottom
                    pos.left = CwZ(target)[0].getBoundingClientRect().left - frame.outerWidth() + horizontalThreshold + (window.scrollX || document.documentElement.scrollLeft);
                    pos.tip.cls = "dir-top";
                    pos.tip.left = (targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (target.outerWidth() / 2) - pos.left - 20;
                }
                else {
                    pos.top = (window.scrollY || document.documentElement.scrollTop) - newVerticalThreshold;
                    pos.tip.top = targetTop + (window.scrollY || document.documentElement.scrollTop) - pos.top - (tipHeight / 2);
                }
            }
            else {
                pos.top = newVerticalThreshold + (window.scrollY || document.documentElement.scrollTop);
                pos.tip.top = targetTop + (window.scrollY || document.documentElement.scrollTop) - pos.top - (tipHeight / 2);
            }
        }
        else if (targetTop - frame.outerHeight() > 0) { // show on top
            pos.left = targetRight - (frame.outerWidth() / 2) + (window.scrollX || document.documentElement.scrollLeft);
            pos.tip.cls = "dir-bottom";
            pos.tip.left = frame.width() + ((targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (pos.left + frame.width()) - (target.width() / 2))
        }
        else { // show on bottom
            pos.left = CwZ(target)[0].getBoundingClientRect().left - frame.outerWidth() + horizontalThreshold + (window.scrollX || document.documentElement.scrollLeft);
            pos.tip.cls = "dir-top";
            pos.tip.left = frame.width() + ((targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (pos.left + frame.width()) - (target.width() / 2));
        }

        if (typeof pos.top === 'undefined') { //case when showing top or bottom
            if (targetTop - frame.outerHeight() > 0) {
                pos.top = targetTop - frame.outerHeight() - (verticalThreshold * 2) + (window.scrollY || document.documentElement.scrollTop);
                pos.tip.cls = "dir-bottom";
            }
            else {
                pos.top = targetBottom + verticalThreshold + (window.scrollY || document.documentElement.scrollTop);
                pos.tip.cls = "dir-top";
            }
        }

        if (target.height() > 20) {//case when showing on left side, override tip values
            if (mouseEvent.clientX < window.innerWidth / 2) {
                pos.tip.left = Math.abs(pos.tip.left);
            }
            else {
                pos.tip.left = frame.width() + ((targetRight + (window.scrollX || document.documentElement.scrollLeft)) - (pos.left + frame.width()) + (target.width() / 2));
            }
            pos.tip.left = targetLeft - pos.left + (window.scrollX || document.documentElement.scrollLeft);
        }
        return pos;
    }

    function _setPopupTip(tipPos) {
        try {
            if (typeof tipPos.top !== 'undefined') {
                CwZ("#auProfNewUI .tooltip-pointer").removeClass("dir-top dir-left dir-right dir-bottom").css('top', tipPos.top + 'px').addClass(tipPos.cls);
                if (tipPos.top > CwZ("#auProfNewUI .wiz-author-info:first").offset().top)
                    CwZ("#auProfNewUI .tooltip-pointer").css("background-color", "#FFF")
            } else {
                CwZ("#auProfNewUI .tooltip-pointer").removeClass("dir-top dir-left dir-right dir-bottom").css('left', tipPos.left + 'px').addClass(tipPos.cls);
            }
        } catch (e) {
        }
    }

    function showAuthorTip(mouseEvent) {
        try {
            var elem = CwZ(mouseEvent.target).closest(".cw-authorLink");
            target = elem;
            var authorId = elem.attr('auid');
            var pubId = elem.attr('pubid');
            var authObj = indexedAuthorList[authorId];
            var customTitle = elem.attr('cw-autitle');
            var strHtml = "";
            AuthorTipUtils.authorsFollowed = [];

            var errorFunc = function (error) {
                if (error.statusText !== "abort") {
                    CwZ("#auProfNewUI").remove();
                }
            };

            if (authObj && !authObj.id) {
                CwZ("#auProfNewUI").remove();
                return;
            }

            var paths = {
                authorInfo: 'https://www.wizdom.ai/api/1?x=14&=et=199&eId=' + authorId,
                discipline: 'https://www.wizdom.ai/api/1?x=17&eId=' + authorId,
                coauthors: 'https://www.wizdom.ai/api/1?x=18&eId=' + authorId,
                pubIds: 'https://www.wizdom.ai/api/1?x=19&eId=' + authorId,
                pubDetails: 'https://www.wizdom.ai/pubsapi?dialog=true'
            };

            if (authorId === "-1") {
                hideAuthorTip();
                return;
            }

            var cache = dataStore[authorId];
            if (cache && Object.keys(cache).length > 0 && cache['authorInfo'].Colwiz.Report.length > 0) {
                try {
                    var info = dataStore[authorId].authorInfo;
                    info = info.Colwiz.Report[0];
                    if (typeof info.title === "undefined") hideAuthorTip();
                    else {
                        strHtml = getAuthorPopup({
                            authorInfo: info,
                            discipline: dataStore[authorId].discipline.Colwiz.Report,
                            coauthors: dataStore[authorId].coauthors.Colwiz.Report,
                            pubsInfo: dataStore[authorId].pubsInfo.Colwiz.Report
                        }, customTitle);

                        CwZ("body").append(strHtml);
                        _setPopupPosition(elem, mouseEvent);
                        CwZ("#auProfNewUI .cw-loading-author").hide();
                        CwZ("#auProfNewUI").show();
                    }
                } catch (e) {
                    console.log(e);
                    hideAuthorTip();
                }
            } else {
                try {
                    CwZ("#auProfNewUI").remove();
                    CwZ("body").append(CwH.templates['getAuthorPopup']({}));
                    _setPopupPosition(elem, mouseEvent);
                    CwZ("#auProfNewUI").show().find(".cw-loading-author").fadeIn();
                } catch(ex){}

                AuthorTipUtils.CWComApi.get(paths.authorInfo).then(function (authorInfo) {
                    AuthorTipUtils.CWComApi.get(paths.discipline).then(function (discipline) {
                        AuthorTipUtils.CWComApi.get(paths.coauthors).then(function (coauthors) {
                            AuthorTipUtils.CWComApi.get(paths.pubIds).then(function (pubIds) {
                                var pubPath = paths.pubDetails;
                                var pubIdParam = pubIds.Colwiz.Report
                                    .map(function (p) {
                                        return p.id
                                    })
                                    .filter(function (p, idx) {
                                        return idx < 3
                                    }).join('&eId=');

                                if (pubIdParam.length > 0) pubPath += '&eId=' + pubIdParam;
                                AuthorTipUtils.CWComApi.get(pubPath).then(function (pubsInfo) {
                                    dataStore[authorId] = {
                                        authorInfo: authorInfo,
                                        discipline: discipline,
                                        coauthors: coauthors,
                                        pubsInfo: pubsInfo
                                    };

                                    try {
                                        var info = dataStore[authorId].authorInfo;
                                        info = info.Colwiz.Report[0];
                                        if (typeof info.title === "undefined") hideAuthorTip();
                                        else {
                                            strHtml = getAuthorPopup({
                                                authorInfo: info,
                                                discipline: dataStore[authorId].discipline.Colwiz.Report,
                                                coauthors: dataStore[authorId].coauthors.Colwiz.Report,
                                                pubsInfo: dataStore[authorId].pubsInfo.Colwiz.Report
                                            }, customTitle);

                                            CwZ("body").append(strHtml);
                                            _setPopupPosition(elem, mouseEvent);
                                            CwZ("#auProfNewUI .cw-loading-author").hide();
                                            CwZ("#auProfNewUI").show();
                                        }

                                    } catch (e) {
                                        console.log(e);
                                        hideAuthorTip();
                                    }
                                }, errorFunc);
                            }, errorFunc);
                        }, errorFunc);
                    }, errorFunc);
                }, errorFunc);
            }
        }
        catch (ex) {
        }
    }

    function getAuthorPopup(data, customTitle) {
        var template = CwH.templates['getAuthorPopup'];
        var context = {};

        if (customTitle) {
            if (customTitle.length - 5 === customTitle.lastIndexOf(' and '))
                customTitle = customTitle.substr(0, customTitle.length - 5);
            if (customTitle.length - 2 === customTitle.lastIndexOf(', '))
                customTitle = customTitle.substr(0, customTitle.length - 2);
        }
        var author = data.authorInfo;
        var initials = AuthorTipUtils.getInitials(author.title);
        author.title = (customTitle || author.title);

        var newDisciplinesArr = [];
        var moreDiscipline = 0;

        var discipline = data.discipline;

        if (discipline && discipline.length > 0) {
            var disciplines = discipline.map(function (disc) {
                return disc.val;
            });
            var discStr = disciplines.join(', ').substr(0, 95).split(', ');
            newDisciplinesArr = discStr.splice(0, discStr.length - 1);
            moreDiscipline = disciplines.length - newDisciplinesArr.length;
        }

        if (author.affiliations && author.affiliations.length > 0) {
            var affiliations = author.affiliations.map(function (affiliation) {
                return affiliation.full;
            });

            if (affiliations.length > 1) {
                var affString = finalArr.join('| ').substr(0, 51).split('| ');
                context.affiliations = affString.length === 1 ? affString : affString.splice(0, affString.length - 1);
                context.moreAffs = finalArr.length - context.affiliations.length;
            } else {
                context.affiliations = finalArr;
            }
        } else {
            context.affiliations = [];
        }

        if (typeof author.Awards !== 'undefined' && author.Awards.length > 0) {
            var allAwards = [];
            author.Awards.map(function (award) {
                allAwards.push(award.title);
            });

            if (author.Awards.length > 1) {
                var awardsStr = allAwards.join('| ').substr(0, 75).split('| ');
                context.awards = awardsStr.length > 1 ? awardsStr.splice(0, awardsStr.length - 1) : awardsStr[0] = [awardsStr[0].slice(0, 65)];
                context.moreAwards = allAwards.length - context.awards.length;
            } else {
                context.awards = allAwards;//.join(", ");
            }
        } else {
            context.awards = [];
        }

        if (typeof author.Editor !== 'undefined' && author.Editor.length > 0) {
            if (author.Editor.length > 1) {
                var editorStr = author.Editor.join('| ').substr(0, 80).split('| ');
                context.editors = editorStr.length > 1 ? editorStr.splice(0, editorStr.length - 1) : editorStr[0] = [editorStr[0].slice(0, 65)];
                context.moreEditors = author.Editor.length - context.editors.length;
            } else {
                var finalArr = [];
                author.Editor.map(function (editor) {
                    editor.length > 70 ? finalArr.push(editor.substr(0, 70) + "...") : finalArr.push(editor);
                });
                context.editors = finalArr;//.join(", ");
            }
        } else {
            context.editors = [];
        }

        context.authorObj = author;
        if (author['count2'] !== '') {
            context.hasAuthors = parseInt(author['count2']) > 0;
        } else {
            context.hasAuthors = false;
        }

        context.domainURL = 'https://' + AuthorTipUtils.cPDF.domain;
        context.authorBaseURL = context.domainURL + generateEntLinks(author.id, author.title, '199');
        context.initials = initials;
        context.disciplines = newDisciplinesArr;
        context.moreDiscipline = moreDiscipline;
        //AuthorTipUtils.cPDF.staticDomainURL.indexOf("https") > - 1 ? "https://" + AuthorTipUtils.cPDF.staticDomainURL : AuthorTipUtils.cPDF.staticDomainURL.indexOf("http") > -1 ? AuthorTipUtils.cPDF.staticDomainURL : "https://" + AuthorTipUtils.cPDF.staticDomainURL;;

        context.authorObj.Publications = data.pubsInfo;
        context.authorObj.Publications.forEach(function (pub) {
            pub.pubBaseURL = context.domainURL + generateEntLinks(pub.id, pub.title, '109');
        });

        if(data.coauthors){
            context.authorObj.CoAuthors = data.coauthors;
            context.authorObj.CoAuthors.forEach(function (coauthor) {
                coauthor.authorBaseURL = context.domainURL + generateEntLinks(coauthor.id, coauthor.title, '199');
            });
        }

        context.logo = publisher.id;
        var refBody = template(context);
        CwZ("#auProfNewUI").remove(); //remove any previous instances if exists
        return refBody;
    }

    function hideAuthorTip() {
        CwZ("#auProfNewUI").stop(true, true).fadeOut(200, function () {
            CwZ("#auProfNewUI").remove();
        });
    }

    function _registerEvents() {
        var tOut;

        CwZ("body").on("mouseenter", ".cw-authorLink", function (e) {
            mouseIn = true;
            clearTimeout(tOut);
            tOut = setTimeout(function () {
                if (mouseIn)
                    showAuthorTip(e, true);
            }, 200);
        });

        CwZ("body").on("mouseleave", ".cw-authorLink", function (e) {
            mouseIn = false;
            tOut = setTimeout(function () {
                CwZ("#auProfNewUI").fadeOut();
                if (xhrInstance) {
                    xhrInstance.abort();
                    xhrInstance = undefined;
                }
            }, 300);
        });

        CwZ("body").on("mouseenter", "#auProfNewUI", function (e) {
            clearTimeout(tOut);
        });

        CwZ("body").on("mouseleave", "#auProfNewUI", function (e) {
            tOut = setTimeout(function () {
                CwZ("#auProfNewUI").fadeOut();
            }, 300);
        });

        CwZ("body").on("click", function (e) {
            if (CwZ("#auProfNewUI:visible").length > 0 && CwZ("#auProfNewUI").has(event.target).length === 0) {
                CwZ("#auProfNewUI").fadeOut();
            }
        });
    }

    function _followAuthor(authorId) {
        if (AuthorTipUtils.authorsFollowed.indexOf(authorId) > -1)
            return;
        if (AuthorTipUtils.appData) {
            var params = {
                os: 72,
                rf: authorId
            };
            AuthorTipUtils.CWComApi.post(AuthorTipUtils.appData.pbxURL, params).then(function (resp) {
                if (resp.success) {
                    CwZ(".cw-follow[data-id='" + authorId + "'] span").text("Followed");
                    CwZ(".cw-follow[data-id='" + authorId + "'] i").removeClass("icon-add").addClass("icon-check");
                    AuthorTipUtils.authorsFollowed.push(authorId);
                }
            }, function (error) {
                // console.log(error);
            });
        }
        else {
            AuthorTipUtils.CWComApi.get("https://" + AuthorTipUtils.cPDF.domain + "/app?x=1b").then(function (resp) {
                if (typeof resp === "string") {
                    AuthorTipUtils.appData = JSON.parse(resp);
                }
                else {
                    AuthorTipUtils.appData = resp;
                }

                var params = {
                    os: 72,
                    rf: authorId
                };
                AuthorTipUtils.CWComApi.post(AuthorTipUtils.appData.pbxURL, params).then(function (resp) {
                    if (resp.success) {
                        CwZ(".cw-follow[data-id='" + authorId + "'] span").text("Followed");
                        CwZ(".cw-follow[data-id='" + authorId + "'] i").removeClass("icon-add").addClass("icon-check");
                        AuthorTipUtils.authorsFollowed.push(authorId);
                    }
                }, function (error) {
                    // console.log(error);
                });
            });
        }
    }

    this.followAuthor = _followAuthor;
    this.registerAuthBtnEvents = _registerEvents;

    _init();
};

var AuthorTipUtils = {
    authorsFollowed: [],
    cPDF: {
        staticDomainURL: "https://cdn.wizdom.ai/static",
        domain: "www.wizdom.ai",
        version: "19.08.16-5124-807",
        js: {
            handlebar: "js/webpdf/lib/handlebars.runtime.js",
            template: 'js/extraction/authortooltip/template.js',
            libraries: ['js/extraction/authortooltip/js/lib/jquery.min.js', 'js/extraction/authortooltip/js/lib/please.js', 'js/extraction/authortooltip/js/lib/initials-avatar.js']
        },
        css: 'js/extraction/authortooltip/css/author-tooltip.9d8d7113a2ceb98df8c8a06d5c2deee1.css'
    },

    init: function () {
        /* ABCD */
        for (var i = 0; i < AuthorTipUtils.cPDF.js.libraries.length; i++) {
            if (!!~AuthorTipUtils.cPDF.js.libraries[i].indexOf("please")) {
                AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js.libraries[i], function () {
                    please.init(window);
                });
            }
            else if (!!~AuthorTipUtils.cPDF.js.libraries[i].indexOf("jquery.min")) {
                if (typeof CwZ === "undefined") {
                    AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js.libraries[i]);
                }
            }
            else {
                AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js.libraries[i]);
            }
        }
        /*if (typeof(CwZTemplate) === 'undefined') {
            AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js['handlebar'], function () {
                CwZTemplate = Handlebars;
                Handlebars.noConflict();
                AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js['template']);
                AuthorTipUtils.addHandlebarCustomFunc();
            });
        }
        else {
            AuthorTipUtils.addScript(AuthorTipUtils.cPDF.js['template']);
            AuthorTipUtils.addHandlebarCustomFunc();
        }*/
        AuthorTipUtils.addHandlebarCustomFunc();
        AuthorTipUtils.addCSS(AuthorTipUtils.cPDF.css);
    },

    addHandlebarCustomFunc: function () {
        CwH.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });

        CwH.registerHelper('getInitials', function (options) {
            var initials = AuthorTipUtils.getInitials(options.fn(this));
            return new CwZTemplate.SafeString(initials);
        });

        CwH.registerHelper('isFollowed', function (v1, options) {
            return AuthorTipUtils.authorsFollowed.indexOf(v1) > -1 ? options.fn(this) : options.inverse(this);
        });
    },
    getInitials: function (name) {
        var nameSplit = name.toUpperCase().split(/[\s.]+/);
        var initials = "";
        if (nameSplit.length === 1) {
            initials = nameSplit[0].charAt(0)
        }
        else {
            initials = nameSplit[0].charAt(0) + nameSplit[nameSplit.length - 1].charAt(0);
        }
        return initials;
    },
    addScript: function (path, callback) {
        try {
            var sc = document.createElement("script");
            var s = document.getElementsByTagName('script')[0];
            if (callback)
                sc.onload = callback;
            sc.type = 'text/javascript';
            var domain = AuthorTipUtils.cPDF.staticDomainURL;

            if (domain.indexOf("http") >= 0)
                sc.src = domain + "/" + path;
            else
                sc.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + domain + "/" + path + '?v=' + AuthorTipUtils.cPDF.version;
            s.parentNode.appendChild(sc);
        }
        catch (e) {
        }
    },
    addCSS: function (path) {
        try {
            var sc = document.createElement("link"),
                s = document.getElementsByTagName("head")[0];
            var filename;
            if (AuthorTipUtils.cPDF.staticDomainURL.indexOf("http") >= 0)
                filename = AuthorTipUtils.cPDF.staticDomainURL + "/" + path;
            else
                filename = ('https:' === document.location.protocol ? 'https://' : 'http://') + AuthorTipUtils.cPDF.staticDomainURL + "/" + path + '?v=' + AuthorTipUtils.cPDF.version;
            sc.setAttribute("rel", "stylesheet");
            sc.setAttribute("type", "text/css");
            sc.setAttribute("href", filename);
            s.appendChild(sc);
        }
        catch (e) {
            // console.log(e);
        }
    },
    get: function (params) {
        return jQuery.ajax({
            type: "GET",
            url: params.url,
            success: function (data, status, xhr) {
                params.success(data);
            },
            error: function (response) {
                params.failure(response);
            }
        });
    },
    post: function (url, type, data, success, failure) {
        return jQuery.ajax({
            type: type,
            url: url,
            data: data,
            dataType: "text",
            success: success,
            error: failure

        })
    },
    postMessage: function (message, data) {
        window.parent.postMessage({
            message: message,
            data: data
        }, '*');
    },
    CWComApi: {
        init: function () {
            if (CwZ("#cw-colwizComFrame").length == 0) {
                var colwizFrame = CwZ('<iframe/>', {
                    id: 'cw-colwizComFrame',
                    src: 'https://' + AuthorTipUtils.cPDF.domain + '/js/extraction/authortooltip/pages/helper.html',
                    style: 'display: none; position: fixed; top: 0px; left:0px; z-index:0; border: 0px; width:0% height:0%',
                }).attr('data-version', AuthorTipUtils.cPDF.version).on("load", function() {
                    AuthorTipUtils.onFrameInit();
                });
                CwZ("body").append(colwizFrame);
            } else {
                AuthorTipUtils.onFrameInit();
            }
        },
        get: function (url) {
            var promise = CwZ.Deferred();
            please(CwZ("#cw-colwizComFrame").get(0).contentWindow).call('get', [url]).then(promise.resolve, promise.reject);
            return promise;
        },
        post: function (url, data) {
            var promise = CwZ.Deferred();
            please(CwZ("#cw-colwizComFrame").get(0).contentWindow).call('post', [url, data]).then(promise.resolve, promise.reject);
            return promise;
        }
    },
    onFrameInit: function () {
        please.init(window);
        var authorsLink = 'https://' + this.cPDF.domain + '/pubsapi?x=13&eId=' + encodeURIComponent(pubdoi) + "&et=109";
        AuthorTipUtils.CWComApi.get(authorsLink).then(function (data) {
            var publicationId = data.Colwiz.Report[0].id;
            var authUrl = 'https://www.wizdom.ai/api/1?x=16&eId=' + publicationId;
            AuthorTipUtils.CWComApi.get(authUrl).then(function (data) {
                var authorsArray;
                authorsArray = data.Colwiz.Report;
                var authArr = [];
                authArr[0] = {};
                authArr[0].authors = authorsArray;
                CWParser.insertClassInAuthorsLink(authArr);
                CWPDFReader.tooltip.registerAuthBtnEvents();
            });
        })
    }
};

function generateEntLinks(id, title, type) {
    var base = function (type) {
        switch (type) {
            case "100":
            case "101":
                return "/profile";
            case "109":
                return "/publication";
            case "110":
                return "/publisher";
            case "111":
                return "/institute";
            case "161":
                return "/group";
            case "163":
                return "/journal";
            case "199":
                return "/author";
        }
    };

    if (typeof type === "undefined" || type === "") {
        type = parseInt(id, 16).toString().substring(0, 3);
    }

    var basepath = base(type);
    if (title.trim() === "") title = basepath.substring(1);

    var encodedTitle = encodeURIComponent(title.toLowerCase().substring(0, 500).trim().replace(/\s+/g, '_'));

    var urlParts = [];
    switch (basepath) {
        case '/profile':
        case '/group':
            urlParts = [basepath, id, encodedTitle];
            break;
        case '/publication':
            urlParts = [basepath, id, 'title', encodedTitle];
            break;
        default:
            urlParts = [basepath, encodedTitle, id];
            break;
    }

    return urlParts.join('/');
}

function noop() {
}

AuthorTipUtils.init();
