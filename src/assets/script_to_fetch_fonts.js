// Go on https://fonts.google.com/?script=Latn, order by name and paste this code on the console; it downloads a json of the fonts

(async function extractAllFonts() {
    const SCROLL_STEP = 1600; // Pixels to be scrolled
    const SCROLL_DELAY = 500; // Milliseconds of delay between each scroll
    const MAX_SCROLLS = 2000; // Maximum number of scrolls to avoid infinite loops
    const fontSet = new Set(); // Set to collect all unique fonts

    let lastScrollPosition = 0;
    let currentScrolls = 0;

    while (currentScrolls < MAX_SCROLLS) {
        document.querySelectorAll('.gf-block-anchor__text').forEach((el) => {
            const fontName = el.textContent.trim();
            if (!fontName.toLowerCase().includes("guides")) {
                fontSet.add(fontName);
            }
        });

        // Scroll by SCROLL_STEP pixels
        window.scrollBy(0, SCROLL_STEP);
        await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));

        // Check if the scroll has reached the bottom of the page
        const currentScrollPosition = window.scrollY;
        if (currentScrollPosition === lastScrollPosition) {
            console.log("Fine dello scrolling. Nessun nuovo contenuto caricato.");
            break;
        }
        lastScrollPosition = currentScrollPosition;
        currentScrolls++;
    }

    // Create an array
    const fonts = Array.from(fontSet).map((fontName, index) => ({
        id: index + 1,
        name: fontName
    }));

    // Create the date to store in the json file
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, ' ');

    const fontsJson = {
        date: formattedDate,
        fonts
    };

    console.log('Totale font estratti:', fonts.length);

    // Save the json in a file
    const blob = new Blob([JSON.stringify(fontsJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google_fonts.json';
    a.click();
    URL.revokeObjectURL(url);
})();


