const caja = document.getElementById("caja");
const form = document.getElementById("form");
const inputNum = document.getElementById("input");
const loader = document.querySelector(".loader");
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemons = async () => {
  const res = await fetch(`${baseURL}?limit=1154`);
  const data = await res.json();
  return data.results;
};

const mapeoPokemons = async () => {
  const pokemons = await fetchPokemons();
  const pokemonData = await pokemons.map(async (poke) => {
    const res = await fetch(poke.url);
    const data = await res.json();
    return data;
  });
  const pokemonResolved = await Promise.all(pokemonData);
  return pokemonResolved;
};

const inputIdValue = async () => {
  const pokemons = await mapeoPokemons();
  const selectPokemons = pokemons.filter(
    (number) => number.id === parseInt(inputNum.value)
  );

  if (selectPokemons.length === 0) {
    alert("No se encontro ningun pokemon");
  } else {
    loadAndPrint(selectPokemons);
  }
};

const submitLoader = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
  }, 6000);
};

const loadAndPrint = (pokeList) => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    renderPokeList(pokeList);
  }, 1000);
};

const renderPokeList = (pokeList) => {
  const cards = pokeList.map((pokemon) => renderPokemones(pokemon));
  caja.innerHTML = cards;
};

const renderPokemones = (pokemones) => {
  const { name, sprites, height, weight, types } = pokemones;

  return `
			<h2>${name.toUpperCase()}</h2>
			<img src="${sprites.other.home.front_default}" alt="">
			<div class="types">
			${types
        .map((tipos) => {
          return `<span class="${tipos.type.name} span_type">${tipos.type.name}</span>`;
        })
        .join("")}
			</div>
			<p>${height / 10} m</p>
			<p>${weight / 10} Kg</p>
	`;
};

const submitForm = (e) => {
  e.preventDefault();
  if (isFormValid()) {
    submitLoader();
    inputIdValue();
  }
};

function init() {
  form.addEventListener("submit", submitForm);
}

init();
