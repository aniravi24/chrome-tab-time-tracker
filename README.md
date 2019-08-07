# chrome-tab-time-tracker
Basic chrome extension to track how many minutes you've spent in a tab.

# Installation

### This extension is still in development. You may install it by following the instructions below at your own risk.
#### It will be published in the chrome web store when/if the known bugs are fixed.

1, Open the Extension Management page by navigating to `chrome://extensions`.
- The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then
selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory.

Instructions copied verbatim from https://developer.chrome.com/extensions/getstarted

# Usage
Just use your browser as normal. The extension has a "T" logo with a black badge on it that shows you how many minutes you've spent within a tab.

# Open known bugs
1. Click away from chrome window, click back into window, open a new tab, click into new tab. Stops tracking because chrome thinks window is out of focus.
    - Environment is Arch Linux running gnome shell under X11.
