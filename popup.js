document.addEventListener("DOMContentLoaded", () => {
  const date = document.getElementById("date");
  const hour = document.getElementById("hour");
  const deleteBtn = document.getElementById("delete");


  deleteBtn.addEventListener("click", () => {


    if (!date.value || !hour.value || !deleteBtn) return;

    chrome.storage.sync.set({ date: date.value, hour: hour.value }, () => {
    });


    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { delete_pressed: true }, () => {
          if (chrome.runtime.lastError) {
          // do nothing, just ignore
        }
      });
    });
  });
});


   
