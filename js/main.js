var theSpan = "";
var concise = {
    $: function(name) {
        if (name.charAt(0) === "#") {
            var a = name.slice(1);
            return document.getElementById(a);
        } else {
            var a = name.slice(1);
            return this.getByClass(a);
        }
    },
    getStyle: function(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    },
    getByClass: function(clsName) {
        eles = [];
        elements = document.getElementsByTagName('*');
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].className.match(clsName)) {
                eles.push(elements[i]);
            }
        }
        return eles;
    },
    hasClass: function(elem, cName) {
        if (elem.className) {
            return !!elem.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        }
        return false;
    },
    addClass: function(elem, cName) {
        if (!concise.hasClass(elem, cName)) {
            elem.className += " " + cName;
        }
    },
    removeClass: function(elem, cName) {
        if (concise.hasClass(elem, cName)) {
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "");
        }
    }
};


(function() {
    var ownTask = {
        HAF: 125, // header and footer
        init: function() {
            var that = this;
            this.getHeight();
            window.onresize = function() {
                that.getHeight();
            };
            this.popup();
        },
        popup: function() {
            this.theFile();
            this.theTime();
            this.theAddTime();
            this.theAddfile();
            this.theDelete();
            this.theOver();
        },
        getHeight: function() {
            var Y = document.documentElement.clientHeight || document.body.clientHeight;
            var theAddHeight = concise.$('.file-add')[0].offsetHeight;
            concise.$("#file-senior").style.height = (Y - this.HAF - theAddHeight) + 'px';
            var theStatusHeight = concise.$('.list-status')[0].offsetHeight;
            concise.$("#list-time").style.height = (Y - this.HAF - theAddHeight - theStatusHeight) + 'px';
            var theTitleHeight = concise.$('.content-title')[0].offsetHeight;
            var theTimeHeight = concise.$('.content-time')[0].offsetHeight;
            concise.$("#content-main").style.height = (Y - this.HAF - theTitleHeight - theTimeHeight) + 'px';
        },
        theFile: function() {
            var theUl = concise.$("#file-senior");
            var that = this;
            EventUtil.addHandler(theUl, "click", function(eve) {
                var theEve = EventUtil.getTarget(EventUtil.getEvent(eve));
                if(theEve.tagName.toLowerCase() === 'span') {
                    var folder = concise.$(".icon-folder-open");
                    for(var i = 0, len = folder.length; i < len; i++) {
                        if(folder[i] === EventUtil.getTarget(EventUtil.getEvent(eve))) {
                            concise.addClass(folder[i], "theColor");
                        } else {
                            concise.removeClass(folder[i], "theColor");
                        }
                    }
                    that.theDisplay(eve);
                } else if(concise.hasClass(theEve.parentNode, "icon-file-empty")) {
                    var theTask = concise.$(".icon-file-empty");
                    for(var j = 0, len = theTask.length; j < len; j++) {
                        if(theTask[j] === theEve.parentNode) {
                            concise.addClass(theTask[j], "otherColor");
                        } else {
                            concise.removeClass(theTask[j], "otherColor");
                        }
                    }
                }
            });
        },
        theTime: function() {
            var theUl = concise.$("#list-time");
            var that = this;
            EventUtil.addHandler(theUl, "click", function(eve) {
                if(EventUtil.getTarget(EventUtil.getEvent(eve)).tagName.toLowerCase() === 'div') {
                    that.theDisplay(eve);
                }
            });
        },
        theDisplay: function(eve) {
            var theUl = EventUtil.getTarget(EventUtil.getEvent(eve)).parentNode.getElementsByTagName('ul');
            for (var i = 0, len = theUl.length; i < len; i++) {
                if (concise.hasClass(theUl[i], "theBlock")) {
                    concise.removeClass(theUl[i], "theBlock");
                    concise.addClass(theUl[i], "theNone");
                } else {
                    concise.removeClass(theUl[i], "theNone");
                    concise.addClass(theUl[i], "theBlock");
                }
            }
        },
        theAddfile: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#addCategory"), "click", function() {
                concise.removeClass(concise.$("#prompt"), "theNone");
                concise.addClass(concise.$("#prompt"), "theBlock");
            });
            EventUtil.addHandler(concise.$("#cancel"), "click", function() {
                concise.removeClass(concise.$("#prompt"), "theBlock");
                concise.addClass(concise.$("#prompt"), "theNone");
            });
        },
        theAddTime: function() {
            var that = this;
            EventUtil.addHandler(concise.$("#addTask"), "click", function() {
                that.showAdd("task");
            });
            EventUtil.addHandler(concise.$("#change"), "click", function() {
                that.showAdd("change");
            });
            EventUtil.addHandler(concise.$("#cancelA"), "click", function() {
                concise.removeClass(concise.$("#editor"), "theBlock");
                concise.addClass(concise.$("#editor"), "theNone");
            });
        },
        showAdd: function(id) {
            concise.removeClass(concise.$("#editor"), "theNone");
            concise.addClass(concise.$("#editor"), "theBlock");
            concise.$("#editor").name = id;
        },
        theDelete: function() {
            EventUtil.addHandler(concise.$("#file-senior"), "click", function(eve) {
                theSpan = EventUtil.getTarget(EventUtil.getEvent(eve));
                if(theSpan.tagName.toLowerCase() === 'span' && concise.hasClass(theSpan, "icon-cross")) {
                    concise.addClass(theSpan.parentNode, "theColor");
                    concise.removeClass(concise.$("#confirm"), "theNone");
                    concise.addClass(concise.$("#confirm"), "theBlock");
                    concise.$("#confirm").name = "delete";
                }
            });
            EventUtil.addHandler(concise.$("#cancelD"), "click", function() {
                concise.removeClass(concise.$("#confirm"), "theBlock");
                concise.addClass(concise.$("#confirm"), "theNone");
            });
        },
        theOver: function() {
            EventUtil.addHandler(concise.$("#over"), "click", function() {
                concise.removeClass(concise.$("#confirm"), "theNone");
                concise.addClass(concise.$("#confirm"), "theBlock");
                concise.$("#confirm").name = "theOver";
            });
            EventUtil.addHandler(concise.$("#cancelD"), "click", function() {
                concise.removeClass(concise.$("#confirm"), "theBlock");
                concise.addClass(concise.$("#confirm"), "theNone");
            });
        }
    };
    ownTask.init();
})();