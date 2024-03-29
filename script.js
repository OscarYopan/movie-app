const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()

  showMovies(data.results)
}

// Create Movie Box

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
    main.appendChild(movieEl)
  })
}

//Class de Color based in the rate

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

//Start the Search event

form.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload()
  }
})

//menu

const menuIcon = document.querySelector('.menu-icon')
const homeIcon = document.querySelector('.home')
const upArrowIcon = document.querySelector('.up')

menuIcon.addEventListener('click', () => {
  homeIcon.classList.toggle('close')
  upArrowIcon.classList.toggle('close')
  console.log('Menu Clicked')
})

homeIcon.addEventListener('click', () => {
  homeIcon.classList.add('close')
  upArrowIcon.classList.add('close')
  console.log('Home Icon Clicked')
})

upArrowIcon.addEventListener('click', () => {
  homeIcon.classList.add('close')
  upArrowIcon.classList.add('close')
  console.log('Up Arrow Icon Clicked')
})
