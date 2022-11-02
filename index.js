// import { allPokemon  } from "./allPokemon.js";

class PokemonData {
  constructor() {
    this.pokemonData = {};
    this.tempPokemonData;
  }

  async init() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1200`;
    const names = await fetch(url)
      .then((res) => res.json())
      .then((jres) => {
        return jres.results.map((pokemon) => pokemon.name);
      })
      .catch((err) => console.log("err:", err));
    // console.log(names);

    names.forEach((name) => {
      this.pokemonData[name] = { name: name };
    });
    // console.log(this.pokemonData);

    return;
  }

  addInfo() {}

  async addCP() {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1200`;
    const names = await fetch(url)
      .then((res) => res.json())
      .then((jres) => {
        return jres.results.map((pokemon) => pokemon);
      })
      .catch((err) => console.log("err:", err));
    console.log(names);
  }

  sort() {
    let tempPokemonArray = [...allPokemons];
    tempPokemonArray.sort((a, b) => {
      // console.log(a,b);
      return b.CP - a.CP;
    });
    console.log(tempPokemonArray);
    return tempPokemonArray;
  }

  choosePokemon(mode) {
    let sortedArray;
    switch (mode) {
      case 100:
        sortedArray = allPokemons;
        break;
      case 1000:
        sortedArray = this.sort().slice(0, allPokemons.length / 2);
        break;
      case 10000:
        sortedArray = this.sort().slice(0, allPokemons.length / 100);
        break;
    }
    const index = this.getRandomIndexForPokemon(sortedArray);
    return sortedArray[index];
  }

  getRandomIndexForPokemon(targetArray) {
    const randomIndex = Math.floor(Math.random() * targetArray.length);
    return randomIndex;
  }

  async findPokemon(index) {
    const namedUrl = `https://pokeapi.co/api/v2/pokemon/?limit=1200`;

    const url = `https://pokeapi.co/api/v2/pokemon/${index}`;

    const returnArray = await fetch(namedUrl)
      .then((res) => res.json())
      .then((jres) => {
        return jres.results.map((pokemon) => pokemon.url);
      })
      .catch((err) => console.log("err:", err));

    if (!returnArray) {
      return;
    }

    //const pokemon = await fetch(url)
    const pokemon = await fetch(returnArray[index])
      .then((res) => res.json())
      .then((jres) => jres);

    const species = await fetch(pokemon.species.url)
      .then((res) => res.json())
      .then((jres) => jres);

    const detailText = species.flavor_text_entries;

    let flavorText = detailText.filter(function (v) {
      return v.language.name == "ja" && v.version.name == "sword";
    })[0].flavor_text;

    console.log(species);

    const nameJa = species.names.filter(
      (namePoke) => namePoke.language.name === "ja"
    )[0].name;
    console.log(nameJa);

    //〇〇ポケモン
    const generaJa = species.genera.filter(
      (namePoke) => namePoke.language.name === "ja"
    )[0].genus;
    console.log(generaJa);

    const imgUrl = pokemon.sprites.front_default;
    console.log(imgUrl);
    // front_default

    pokemon.detainlText = flavorText;

    console.log(flavorText);

    console.log(pokemon);
    return pokemon;
  }

  async test(index) {
    // const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
    // const pokemon = await fetch(url)
    //     .then(res => res.json());

    console.log(allPokemons.length);
    return pokemon;
  }
}

class Gacha {
  constructor() {
    this.myMoney;
  }

  async getPokemonAction() {
    const getPokemon = await findPokemon(0);
  }
}
// console.log(allPokemon);
const p = new PokemonData();
// p.findPokemon(10).then(res => console.log(res))
// p.addCP().then(res => console.log(res))
// p.test("bulbasaur").then(res => console.log(res))

console.log(p.choosePokemon(10000));
