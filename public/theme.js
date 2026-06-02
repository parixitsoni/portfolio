(function() {
  try {
    let theme = localStorage.getItem('theme');
    const override = localStorage.getItem('theme_override') === 'true';
    if (!theme || !override) {
      const hour = new Date().getHours();
      theme = (hour >= 19 || hour < 7) ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
