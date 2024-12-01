(async function extractAllFonts() {
    const SCROLL_STEP = 1600; // Numero di pixel da scrollare ogni volta
    const SCROLL_DELAY = 500; // Millisecondi di attesa tra ogni scroll
    const MAX_SCROLLS = 2000; // Numero massimo di scroll per evitare loop infiniti
    const fontSet = new Set(); // Set per raccogliere tutti i font unici

    let lastScrollPosition = 0; // Ultima posizione di scroll
    let currentScrolls = 0;

    while (currentScrolls < MAX_SCROLLS) {
        // Estrai i font visibili attualmente
        document.querySelectorAll('.gf-block-anchor__text').forEach((el) => {
            const fontName = el.textContent.trim();
            fontSet.add(fontName);
        });

        // Scrolla di SCROLL_STEP pixel
        window.scrollBy(0, SCROLL_STEP);
        await new Promise((resolve) => setTimeout(resolve, SCROLL_DELAY));

        // Controlla se lo scroll ha raggiunto il fondo della pagina
        const currentScrollPosition = window.scrollY;
        if (currentScrollPosition === lastScrollPosition) {
            console.log("Fine dello scrolling. Nessun nuovo contenuto caricato.");
            break;
        }
        lastScrollPosition = currentScrollPosition;
        currentScrolls++;
    }

    // Crea un array di oggetti per i font con ID e nome
    const fonts = Array.from(fontSet).map((fontName, index) => ({
        id: index + 1,
        name: fontName
    }));

    // Struttura finale del JSON
    const fontsJson = { fonts };

    console.log('Totale font estratti:', fonts.length);
    console.log('Esempio font:', fonts.slice(0, 10));

    // Salva il JSON in un file
    const blob = new Blob([JSON.stringify(fontsJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google_fonts.json';
    a.click();
    URL.revokeObjectURL(url);
})();
