// [0] refers to the actual time value
// [1] refers to the setinterval function for that tab

const timeSpent = {};
let activeTabId;
chrome.browserAction.setBadgeBackgroundColor({ color: "black" });
function onUpdatedListener(tabId, changeInfo, tab) {
  chrome.tabs.get(tabId.tabId, function(tab) {
    // when previous tab is changed
    if (timeSpent[activeTabId]) {
      clearInterval(timeSpent[activeTabId][1]);
    }
    // active tab
    activeTabId = tab.id;
    if (!timeSpent[activeTabId]) {
      timeSpent[activeTabId] = [0, 0];
      chrome.browserAction.setBadgeText({ text: "0m" });
    } else {
      chrome.browserAction.setBadgeText({
        text: timeSpent[activeTabId][0] + "m"
      });
    }
    // start tracking again
    timeSpent[activeTabId][1] = setInterval(
      timeTrack.bind(timeTrack),
      1 * 60 * 1000
    );
  });
}
// Subscribe to tab events
chrome.tabs.onActivated.addListener(onUpdatedListener);
// End tabs listeners-----------

function timeTrack() {
  timeSpent[activeTabId][0] += 1;
  chrome.browserAction.setBadgeText({ text: timeSpent[activeTabId][0] + "m" });
}
