// AMD or classic
typeof define === "function" ? define(["abaaso"], function (abaaso) { return init(abaaso); })
                             : abaaso.on("init", function () { init(abaaso); }, "abaaso.tabs");
})(this);
