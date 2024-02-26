(() => {
    const getStoredTheme = () => localStorage.getItem('theme') || 'auto';
    const setStoredTheme = (theme) => localStorage.setItem('theme', theme);
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getSystemMatchedTheme = () => darkModeQuery.matches ? 'dark' : 'light'

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        const validThemes = ['light', 'dark', 'auto'];
        // It will only return the stored theme if it is a valid theme
        if (validThemes.includes(storedTheme)) {
            return storedTheme
        }
        // A fallback strategy to get value based on the window preferred theme
        return getSystemMatchedTheme();
    }

    const setTheme = (theme) => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-theme', getSystemMatchedTheme());
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    setTheme(getPreferredTheme());

    darkModeQuery.addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            const preferredTheme = getPreferredTheme();
            setTheme(preferredTheme);

            // A fallback strategy when stored theme has typing error's. It also prevents the frequent updates in local storage
            if (preferredTheme !== storedTheme) {
                setStoredTheme('auto');
            }
        }
    });

})();