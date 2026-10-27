(function () {
  var key = "mhomeeasy-lang";

  function apply(lang) {
    var chinese = lang === "zh";
    document.documentElement.classList.toggle("lang-zh", chinese);
    document.documentElement.lang = chinese ? "zh-Hans" : "en";
    document.querySelectorAll("[lang='en'], [lang='zh-Hans']").forEach(function (node) {
      if (node === document.documentElement || node === document.body) return;
      var isChinese = node.getAttribute("lang") === "zh-Hans";
      node.hidden = chinese ? !isChinese : isChinese;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
      var selected = button.getAttribute("data-set-lang") === (chinese ? "zh" : "en");
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    try {
      localStorage.setItem(key, chinese ? "zh" : "en");
    } catch (error) {}
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-lang]");
    if (!button) return;
    apply(button.getAttribute("data-set-lang"));
  });

  var saved = "en";
  try {
    saved = localStorage.getItem(key) || "en";
  } catch (error) {}
  apply(saved === "zh" ? "zh" : "en");
})();
