function getAsync(keys): Promise<Record<string, any>> {
    return new Promise(res => chrome.storage.local.get(keys, res))
}

function setAsync(items: Object): Promise<void> {
    return new Promise(res => chrome.storage.local.set(items, res));
}

export async function findNewId(ids: string[]) {
    let existingIds = await getAsync(ids);
    return ids.find(id => !existingIds[id])
}

export function storeSet(id: string, cards: set) {
    return setAsync({[id]: cards})
}

export const storage = {getAsync}
