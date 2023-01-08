import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const userInput = document.querySelector('#search-box');
const userList = document.querySelector('.country-list');
const userInfo = document.querySelector('.country-info');

userInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    userInfo.innerHTML = '';
    userList.innerHTML = '';
    return;
  }
  fetchCountries(inputValue)
    .then(data => createMarkup(data))

    .catch(err => {
      return Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkup(arr) {
  if (arr.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arr.length > 1) {
    userInfo.innerHTML = '';
    userList.innerHTML = arr
      .map(({ name, flags }) => {
        return `<li class="country-item"><img src="${flags.svg}" alt="Flag of ${name.official}"  width="30" /><h3>${name.official}</h3></li>`;
      })
      .join('');
  } else if ((arr.length = 1)) {
    const { name, capital, population, flags, languages } = arr[0];
    userList.innerHTML = '';
    userInfo.innerHTML = `<img src="${flags.svg}" alt="Flag of ${
      name.official
    }"  width="200" /><h2>${
      name.official
    }</h2><h3>Capital: ${capital}</h3><h3>Population: ${population}</h3><h3>Languages: ${Object.values(
      languages
    )}</h3>`;
  }
}
