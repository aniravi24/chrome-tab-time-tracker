// tabs data structure is { id: [minutes, seconds, setinterval] }
// windows data structure is { id: lastActiveTabId }

chrome.browserAction.setBadgeBackgroundColor({ color: "black" });
const tabs = {};
const windows = {};

let activeTabId;
let activeWindowId;

function timeTrack() {
  tabs[activeTabId][1] += 1;
  if (tabs[activeTabId][1] >= 60) {
    tabs[activeTabId][1] = 0;
    tabs[activeTabId][0] += 1;
    chrome.browserAction.setBadgeText({
      text: tabs[activeTabId][0] + "m"
    });
  }
}

function onUpdatedTabListener(tabId, changeInfo, tab) {
  chrome.tabs.get(tabId.tabId, function(tab) {
    // when previous tab is changed
    if (tabs[activeTabId]) {
      clearInterval(tabs[activeTabId][2]);
    }
    // active tab
    activeTabId = tab.id;
    if (!tabs[activeTabId]) {
      tabs[activeTabId] = [0, 0, 0];
      chrome.browserAction.setBadgeText({ text: "0m" });
    } else {
      chrome.browserAction.setBadgeText({
        text: tabs[activeTabId][0] + "m"
      });
    }
    // start tracking again
    clearInterval(tabs[activeTabId][2]);
    tabs[activeTabId][2] = setInterval(timeTrack.bind(timeTrack), 1000);
  });
}

function windowFocusChangedListener(windowId) {
  // when window is not focused
  if (windowId == chrome.windows.WINDOW_ID_NONE) {
    if (tabs[activeTabId]) {
      clearInterval(tabs[activeTabId][2]);
    }
  } else {
    if (windowId !== activeWindowId) {
      if (activeTabId) windows[activeWindowId] = activeTabId;
      if (tabs[activeTabId]) clearInterval(tabs[activeTabId][2]);
      if (windows[windowId]) activeTabId = windows[windowId];
      else activeTabId = undefined;
      activeWindowId = windowId;
    }
    if (tabs[activeTabId]) {
      clearInterval(tabs[activeTabId][2]);
      tabs[activeTabId][2] = setInterval(timeTrack.bind(timeTrack), 1000);
    }
  }
}

// subscribe to window focus change events
chrome.windows.onFocusChanged.addListener(windowFocusChangedListener);

// Subscribe to tab events
chrome.tabs.onActivated.addListener(onUpdatedTabListener);
