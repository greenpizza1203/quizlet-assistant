import Fuse from "fuse.js/dist/fuse.basic.esm";

type fuseCard = { front: string, back: string }
export const options: Fuse.IFuseOptions<fuseCard> = {
    includeScore: false,
    ignoreLocation: true,
    findAllMatches: true,
    keys: ["front"]
};


export class Fuzzy {

    existing = {}
    fuse: Fuse<fuseCard> = new Fuse([], options)

    count = 0

    addSets(sets: Dict<set>) {
        Object.entries(sets).forEach(([setId, set]) => {
            if (this.existing[setId]) return
            for (let {word, definition} of set) {
                this.fuse.add({front: word, back: definition})
                this.fuse.add({front: definition, back: word})
                this.count++
            }
            this.existing[setId] = true;
        })
    }

    search(fuzzy: any) {
        const t0 = performance.now();
        let results = this.fuse.search(fuzzy, {limit: 3});
        console.log(this.fuse.getIndex())
        const t1 = performance.now();
        console.log(`Searched ${this.count} cards in ${t1 - t0} milliseconds.`);
        return results.map(result => result.item)
    }


}
