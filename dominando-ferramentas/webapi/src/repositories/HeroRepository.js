const { readFile, writFile} = require('fs/promisses')

class HeroRepository{
    constructor({file}){
        this.file = file;
    }

    async _currentFileContent(){
        return JSON.parse(await readFile(this.file));
    }

    async find(itemId){
        const all = await this._currentFileContent();
        if(!itemId) return all;

        return all.find(({id}) => itemId === id);
    }

}


module.export = HeroRepository;