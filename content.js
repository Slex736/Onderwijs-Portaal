chrome.runtime.onMessage.addListener((message) => {
    if (message.delete_pressed) {
        reloadPage();
    }
});



function reloadPage() {
    try {
        chrome.storage.sync.get(['date', 'hour'], (data) => {
            const date = data.date;
            const hour = data.hour;

            if (!date || !hour) return alert("No date or hour found in storage.");

            const spans = document.querySelectorAll('span[data-table-date="true"]');
            spans.forEach(span => {
                [year, month, day] = date.split("-")
                newDate = `${day}-${month}-${year}`

                if (span.textContent.trim() === newDate) {

                const GoodDay = document.querySelector(`table[data-table-date="${newDate}"]`);
                if (!GoodDay) return alert("No table found for the specified date.");
                const HourIcons = GoodDay.querySelectorAll(".lessonNumber")

                    for (const icon of HourIcons) {
                        if (icon.textContent.trim() === hour) {
                            let ancester = icon;
                            for (let i = 0; i < 4; i++) {
                                if(!ancester.parentElement) break;
                                ancester = ancester.parentElement;
                            }
                            ancester.innerHTML = " ";
                        }
                    };
                }
            });
        });
    } catch (error) {
        // do nothing, just ignore
    }
}


// Create the observer with a callback
let timeout;
const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(reloadPage, 100);
});


// Configure to watch for child additions/removals in the subtree
const config = { childList: true, subtree: true };

// Start observing the document body
observer.observe(document.body, config);