class HeroService{

    constructor({heroRepository}){
        this.heroRepository = heroRepository;
    }


    async find(data){
        return this.heroRepository.find(data);
    }

    async create(data){
        return this.heroRepository.create(data);
    }
}

module.exports = HeroService;