import {Fuzzy} from "./fuzzy";

let fuzzy = new Fuzzy()
onmessage = async function ({data}) {
    if (data.sets) fuzzy.addSets(data.sets)
    const fuzzyRequest = data.fuzzy ?? data
    if (typeof fuzzyRequest == "string") postMessage(fuzzy.search(fuzzyRequest))
}

