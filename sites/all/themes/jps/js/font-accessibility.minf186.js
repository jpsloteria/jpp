! function(t) {
    t.fn.easyView = function(e, o) {
        var n = t(this.selector);
        if (void 0 === n.data("easyView")) {
            "string" == typeof e && (e = {}), (s = {
                selector: n,
                currentRatio: 100,
                normalContrast: !0,
                defaults: {
                    container: "body",
                    tags: ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "a", "span", "strong", "em", "ul", "ol", "li"],
                    step: 10,
                    bootstrap: !0,
                    defaultMarkup: '<a href="#decrease" class="decrease-text">Decrease font size</a><a href="#normal" class="reset-text">Normal font size</a><a href="#increase" class="increase-text">Increase font size</a><a href="#contrast" class="contrast-text">Change contrast</a>',
                    increaseSelector: ".increase-text",
                    decreaseSelector: ".decrease-text",
                    normalSelector: ".reset-text",
                    contrastSelector: ".contrast-text",
                    persist: !1
                },
                options: {},
                affectedTags: new Array,
                mergeOptions: function(e) {
                    t.extend(this.options, this.defaults, e)
                },
                storeDefaults: function() {
                    t.each(this.affectedTags, function(e, o) {
                        t(o).each(function() {
                            var e = t(this),
                                o = e.css("font-size");
                            o.indexOf("%") > -1 ? (e.data("originalSize", parseInt(o.replace("%", ""))), e.data("originalUnit", "%")) : (e.data("originalSize", parseInt(o.replace(o.substr(-2), ""))), e.data("originalUnit", o.substr(-2))), e.data("originalBackground", e.css("background-color")), e.data("originalColor", e.css("color"))
                        })
                    }), t(this.options.container).data("originalBackground", t(this.options.container).css("background-color")), t(this.options.container).data("originalColor", t(this.options.container).css("color"))
                },
                createDefaultMarkup: function() {
                    "" == n.html() && n.html(this.options.defaultMarkup)
                },
                setActions: function() {
                    var t = this;
                    n.find(this.options.decreaseSelector).click(function(e) {
                        e.preventDefault(), t.decreaseFont()
                    }), n.find(this.options.normalSelector).click(function(e) {
                        e.preventDefault(), t.resetFont()
                    }), n.find(this.options.increaseSelector).click(function(e) {
                        e.preventDefault(), t.increaseFont()
                    }), n.find(this.options.contrastSelector).click(function(e) {
                        e.preventDefault(), t.changeContrast()
                    })
                },
                fetchTags: function() {
                    var e = this.affectedTags,
                        o = this.options;
                    t.each(this.options.tags, function(t, n) {
                        e.push(o.container + " " + n)
                    })
                },
                decreaseFont: function() {
                    this.currentRatio - this.options.step >= 10 && (this.currentRatio = this.currentRatio - this.options.step), this.changeFontSize();
                    if (this.currentRatio < 80) {
                        this.currentRatio = 80;
                    }
                },
                resetFont: function() {
                    this.currentRatio = 100, this.changeFontSize()
                },
                increaseFont: function() {
                    this.currentRatio = this.currentRatio + this.options.step, this.changeFontSize();
                    if (this.currentRatio > 120) {
                        this.currentRatio = 120;
                    }
                },
                changeFontSize: function(e) {
                    void 0 !== e && parseInt(e) > 10 && (this.currentRatio = e);
                    var o = this.currentRatio;
                    t.each(this.affectedTags, function(e, n) {
                        t(n).each(function() {
                            var e = t(this);
                            e.css("font-size", e.data("originalSize") * (o / 100) + e.data("originalUnit"))
                        })
                    }), this.persistConfig()
                },
                changeContrast: function() {
                    var e = this.normalContrast;
                    t(this.affectedTags.join(",")).each(function() {
                        var o = t(this);
                        e ? o.css("color", "#fff") : o.css("color", o.data("originalColor"))
                    }), t(this.options.container).css("color", this.normalContrast ? "#fff" : t(this.options.container).data("originalColor")), t(this.options.container).css("background-color", this.normalContrast ? "#000" : t(this.options.container).data("originalBackground")), this.normalContrast = !this.normalContrast, this.persistConfig()
                },
                persistConfig: function() {
                    this.options.persist && ("undefined" != typeof Storage ? window.localStorage.setItem(this.selector.selector, this.getCurrentConfig()) : console.log("Web Storage not available!"))
                },
                getCurrentConfig: function() {
                    var t = {
                        ratio: this.currentRatio,
                        normalContrast: !this.normalContrast
                    };
                    return JSON.stringify(t)
                },
                restoreFromStorage: function() {
                    if (this.options.persist) {
                        var t = window.localStorage.getItem(this.selector.selector);
                        t && (t = JSON.parse(t), this.currentRatio = t.ratio, this.normalContrast = t.normalContrast, this.changeFontSize(), this.changeContrast())
                    }
                },
                startPlugin: function(t) {
                    this.mergeOptions(t), this.fetchTags(), this.storeDefaults(), this.createDefaultMarkup(), this.setActions(), this.restoreFromStorage()
                },
                executeFunction: function(t, e) {
                    switch (t) {
                        case "decrease":
                            this.decreaseFont();
                            break;
                        case "reset":
                            this.resetFont();
                            break;
                        case "increase":
                            this.increaseFont();
                            break;
                        case "contrast":
                            void 0 !== e && (this.normalContrast = !!e), this.changeContrast();
                            break;
                        case "setRatio":
                            this.changeFontSize(ratio);
                            break;
                        default:
                            alert("Called function does not exist!")
                    }
                },
                destroy: function() {
                    this.resetFont(), this.normalContrast = !1, this.changeContrast(), n.removeData("easyView")
                }
            }).startPlugin(e), n.data("easyView", s)
        } else {
            var s = n.data("easyView");
            "object" == typeof e ? (s.destroy(), s.startPlugin(e)) : "string" == typeof e ? s.executeFunction(e, o) : alert("Invalid params to start")
        }
    }
}(jQuery);

