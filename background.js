chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"title": "Hearthstoneカードを和訳", "contexts": ["page"], "id": "hearthstone_card_to_japanese"});
});

chrome.contextMenus.onClicked.addListener(contextMenuClick);

function contextMenuClick(info, tab) {
  if (info.menuItemId == "hearthstone_card_to_japanese") {
    chrome.tabs.executeScript({file: "data/cards.js"}, function() {
      chrome.tabs.executeScript({file: "translate_to_japanese.js"});
    });
  }
};
