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

  choosePokemon(mode, gacha) {
    console.log(gacha);
    let sortedArray;

    if (gacha.myMoney !== 11000) {
      switch (Number(mode)) {
        case 100:
          sortedArray = allPokemons;
          break;
        case 1000:
          sortedArray = this.sort().slice(0, allPokemons.length / 2);
          break;
        case 10000:
          console.log("test");
          sortedArray = this.sort().slice(0, allPokemons.length / 100);
          break;
      }
    } else {
      sortedArray = this.sort().slice(0, 1);
    }
    const index = this.getRandomIndexForPokemon(sortedArray);

    this.findPokemon(sortedArray[index].name).then(() => {
      // alert(
      //   `ポケモン（英）：${sortedArray[index].name},強さ： ${sortedArray[index].CP}`
      // );
    });
  }

  getRandomIndexForPokemon(targetArray) {
    const randomIndex = Math.floor(Math.random() * targetArray.length);
    return randomIndex;
  }

  async findPokemon(index) {
    // const namedUrl = `https://pokeapi.co/api/v2/pokemon/?limit=1200`;

    const url = `https://pokeapi.co/api/v2/pokemon/${index}`;

    // const returnArray = await fetch(namedUrl)
    //   .then((res) => res.json())
    //   .then((jres) => {
    //     return jres.results.map((pokemon) => pokemon.url);
    //   })
    //   .catch((err) => console.log("err:", err));

    // if (!returnArray) {
    //   return;
    // }

    const pokemon = await fetch(url)
      // const pokemon = await fetch(returnArray[index])
      .then((res) => res.json())
      .then((jres) => jres);

    const species = await fetch(pokemon.species.url)
      .then((res) => res.json())
      .then((jres) => jres);

    const status = pokemon.stats;
    console.log(status);
    console.log(status[1]);

    let canvasHp = document.getElementById("HP");
    canvasHp.innerHTML =
      "HP: " + status[0].base_stat + " / " + status[0].base_stat;
    let canvasAttack = document.getElementById("attack");
    canvasAttack.innerHTML = "こうげき　" + status[1].base_stat;
    let canvasDefense = document.getElementById("defense");
    canvasDefense.innerHTML = "ぼうぎょ　" + status[2].base_stat;
    let canvasSpecialAttack = document.getElementById("special-attack");
    canvasSpecialAttack.innerHTML = "とくこう　" + status[3].base_stat;
    let canvasSpecialDefense = document.getElementById("special-defense");
    canvasSpecialDefense.innerHTML = "とくぼう　" + status[4].base_stat;

    const detailText = species.flavor_text_entries;
    console.log(detailText);

    let flavorText = detailText.filter(function (v) {
      return v.language.name == "ja";
    })[0].flavor_text;

    let canvasCharacter = document.getElementById("character");
    canvasCharacter.innerHTML = flavorText;

    console.log(species);

    const nameJa = species.names.filter(
      (namePoke) => namePoke.language.name === "ja"
    )[0].name;
    console.log(nameJa);
    let canvasName = document.getElementById("Name");
    canvasName.innerHTML = nameJa;

    //〇〇ポケモン
    const generaJa = species.genera.filter(
      (namePoke) => namePoke.language.name === "ja"
    )[0].genus;
    console.log(generaJa);

    const imgUrl = pokemon.sprites.front_default;
    console.log(imgUrl);
    let imgElement = document.getElementById("pic");
    imgElement.src = imgUrl;

    // front_default

    pokemon.detainlText = flavorText;

    let canvasNo = document.getElementById("no");
    canvasNo.innerHTML = "No. " + pokemon.id;

    console.log(flavorText);

    console.log(pokemon);
    // console.log(pokemon.id);

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
    this.myMoney = 0;
    console.log(this.myMoney);
    this.pokeIns = new PokemonData();
  }

  init() {
    //金額投入ボタン
    const btnElems = document.querySelectorAll("#moneyButton")[0].childNodes;
    for (const btn of btnElems) {
      if (btn.type == "button") {
        btn.addEventListener("click", (e) => {
          this.pushMoneyButton(e);
        });
        // console.log(btn.type);
      }
    }

    //商品ボタンプッシュ
    const gachaBtnElems = document.querySelectorAll(".gachaBtn");
    for (const btn of gachaBtnElems) {
      // console.log(btn.getAttribute("price"));
      const price = btn.getAttribute("price");
      btn.addEventListener("click", (e) => {
        if (this.reduceMyMoney(price)) {
          this.fallBall(price);
          this.pokeIns.choosePokemon(price, this);
        } else {
          alert("お金が足りません");
        }
      });
    }

    // console.log(btnElems.childNodes);
  }

  sequenceOfGame() {}

  async getPokemonAction() {
    const getPokemon = await findPokemon(0);
  }

  pushMoneyButton(e) {
    // console.log(this);
    const moneyWindow = document.querySelector("#money");
    this.myMoney += Number(e.target.value);

    moneyWindow.innerText = this.myMoney + "円";
  }

  reduceMyMoney(val) {
    const moneyWindow = document.querySelector("#money");
    if (this.myMoney >= Number(val)) {
      this.myMoney -= Number(val);
      moneyWindow.innerText = this.myMoney + "円";
      return true;
    }
    return false;
  }

  fallBall(price) {
    let ballPosition = 0;
    const fallSpeed = 5;

    const setBall = setInterval(() => {
      if (ballPosition > 200) {
        window.clearInterval(setBall);
        const clearBall = setTimeout(() => {
          const ballImg = document.querySelector(`#ball${price}`);
          ballImg.style.display = "none";
        }, 1000);
      }

      const ballImg = document.querySelector(`#ball${price}`);
      ballImg.style.display = "block";

      ballPosition += fallSpeed;
      ballImg.style.top = ballPosition + "px";
    }, 10);
  }
}

// console.log(allPokemon);
// const p = new PokemonData();
// p.findPokemon(10).then((res) => console.log(res));
// p.addCP().then(res => console.log(res))
// p.test("bulbasaur").then(res => console.log(res))

// console.log(p.choosePokemon(10000));

const gacha = new Gacha();
gacha.init();

// exports = { Gacha };
