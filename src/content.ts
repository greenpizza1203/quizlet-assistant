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
    busy = false;
    if (lastRequest) {
        let request = lastRequest;
        lastRequest = null;
        requestFuzzy(request)

    }
    renderCards(data)
}

let busy = false;
let lastRequest;

export async function requestFuzzy(fuzzy) {
    if (busy) {
        lastRequest = fuzzy
        return;
    } else {
        busy = true;
        (await worker).postMessage(fuzzy)
    }

}

