const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME = "standard";
const THEMES = ["standard", "dark", "light", "spring"];

const applyTheme = (theme) => {
  const resolvedTheme = THEMES.includes(theme) ? theme : DEFAULT_THEME;
  const root = document.documentElement;

  root.setAttribute("data-theme", resolvedTheme);
  root.classList.toggle("dark", resolvedTheme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, resolvedTheme);

  return resolvedTheme;
};

class ThemeService {
  getTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
  }

  setTheme(theme) {
    return applyTheme(theme);
  }

  initTheme() {
    return applyTheme(this.getTheme());
  }

  getThemes() {
    return [...THEMES];
  }
}

export default new ThemeService();
