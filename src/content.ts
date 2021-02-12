import {fetchString} from "./utils";
import {createElement, renderCards} from "./mouseover";
import {storage} from "./storage";

console.log("injecting content script")
let worker = createWorker()
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handleBackground(message)
    sendResponse(true);
});

async function handleBackground({ids, search}) {
    const sets = await storage.getAsync(ids);
    (await worker).postMessage({sets, fuzzy: search})
}

async function createWorker() {
    await createElement();
    let blob = new Blob([await fetchString("worker.js")], {type: 'application/javascript'});
    let worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = handleWorkerMessage
    return worker;

}

function handleWorkerMessage({data}) {
    renderCards(data)
}

export async function requestFuzzy(fuzzy) {
    (await worker).postMessage(fuzzy)
}

