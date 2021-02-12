import {fetchString} from "./utils";
import {requestFuzzy} from "./content";

type CardElement = HTMLDivElement & { firstElementChild: HTMLDivElement, lastElementChild: HTMLDivElement }
export let parent: HTMLDivElement;
export let cards: CardElement[] = []

export async function createElement() {
    parent = document.body.appendChild(document.createElement('div'))
    parent.classList.add("limeLightParent", "fade", "outerFade")
    const mouseOverCode = await fetchString("mouseover.html")
    for (let i = 0; i < 3; i++) {
        const placeholder = document.createElement('div');
        placeholder.innerHTML = mouseOverCode
        let divItem = placeholder.firstElementChild;
        const cardElement = divItem as HTMLDivElement;
        parent.appendChild(divItem);

        cards.push(cardElement as unknown as CardElement)
    }

}

document.onmousemove = (event: MouseEvent) => {
    parent.style.left = event.x + 40 + "px";
    parent.style.top = event.y + 30 + "px";
    updateSelection(event);
}
let targetText: string

export function updateSelection(event: MouseEvent) {
    if (event) {
        parent.style.left = event.x + 40 + "px";
        parent.style.top = event.y + 30 + "px";
    }
    let text = window.getSelection().toString() || getTextFromElement(event) || targetText
    text = text?.trim();
    if (targetText === text) return;
    targetText = text;

    if (targetText) {
        parent.classList.remove("outerFade");
        delayedSend()
    } else {
        parent.classList.add("outerFade")
    }
}

let lastRequest;
let delay = 400;

function delayedSend() {
    if (lastRequest) clearTimeout(lastRequest)
    lastRequest = setTimeout(send, delay)
}

function send() {
    requestFuzzy(targetText)
}


function getTextFromElement(event: MouseEvent) {
    if (!event) return
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    const tag = element?.tagName;
    if (tag !== 'P' && tag !== "SPAN" && tag !== "PRE") return;
    return element?.innerText;
}

export function renderCards(results) {
    if (!results.length) {
        parent.classList.add("fade")
    } else {
        cards.forEach((cardElement, index) => {
            const item = results[index];
            const wordElement = cardElement.firstElementChild;
            const definitionElement = cardElement.lastElementChild;
            if (item) {
                cardElement.style.opacity = "1";
                wordElement.innerText = item.front;
                definitionElement.innerText = item.back;
            } else {
                cardElement.style.opacity = "0";
                wordElement.innerText = ""
                definitionElement.innerText = ""
            }
        })

        parent.classList.remove("fade")
    }
}
