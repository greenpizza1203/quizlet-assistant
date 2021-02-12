import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;
import {getIds, scrapeSet} from "./quizlet";
import {findNewId, storeSet} from "./storage";


chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "title": "Search flashcards",
        "id": "search",
        "contexts": ["selection"]
    });
});
chrome.contextMenus.onClicked.addListener(handleClick)


async function handleClick(info: OnClickData, tab: Tab) {
    const search = info.selectionText.trim()
    if (!search) return
    let ids = await getIds(search);
    let newId = await findNewId(ids)
    if (newId) await storeSet(newId, await scrapeSet(newId))
    sendToContent({ids, search}, tab)
}

function sendToContent(data, tab) {
    chrome.tabs.sendMessage(tab.id, data, async (e) => {
        // just checking
        chrome.runtime.lastError?.message
        if (e) return;
        const target = {tabId: tab.id}
        chrome.scripting.insertCSS({files: ["mouseover.css"], target})
        chrome.scripting.executeScript({
            files: ['content.js'], target
        }, () => chrome.tabs.sendMessage(tab.id, data));
    });

}



