(function () {
  try {
    var t = localStorage.getItem('theme');
    document.documentElement.dataset.theme = (t === 'gray' || t === 'light') ? t : 'dark';
  } catch (e) { document.documentElement.dataset.theme = 'dark'; }
})();
