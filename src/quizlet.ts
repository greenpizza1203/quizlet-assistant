import {searchQuizlet} from "./serp";

export function getId(url: string): string | undefined {
    let parts = new URL(url).pathname.split('/');
    let id = parts.find(part => (+part).toString() == part);
    if (!id) console.warn("unable to process quizlet url" + url)
    return id;
}

export async function getIds(query: string): Promise<string[]> {
    const results = await searchQuizlet(query)
    return results.map(result => getId(result.link)).filter(it => it)
}

export async function scrapeSet(id: string, actuallyScrape = true): Promise<any> {
    console.log(`scraping quizlet set #${id}`)
    if (!actuallyScrape) return;
    const response = await fetch("https://quizlet.com/webapi/3.2/terms?%5BisPublished%5D=true&filters%5BsetId%5D=" + id)

    const json = await response.json()
    const cards = json.responses[0].models.term

    return cards.filter(card => !card.isDeleted).map(({word, definition}) => ({word, definition}))

}
