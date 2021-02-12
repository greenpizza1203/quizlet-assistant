
export async function fetchString(path: string): Promise<string> {
    const url = chrome.runtime.getURL(path)
    let response = await fetch(url);
    return response.text();
}
