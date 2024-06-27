self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('movie-app-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/app.js',
                '/manifest.json',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
            ]);
        })
    );
 });
  
 self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
 });

 document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(error => console.error('Service Worker Registration Failed:', error));
    }
  //af5abaa649c5688e9d56d5410fc78240
  //key: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjVhYmFhNjQ5YzU2ODhlOWQ1NmQ1NDEwZmM3ODI0MCIsIm5iZiI6MTcxOTQ1MDcwNS4yMTUzNjUsInN1YiI6IjY2N2NiYTZlZjcwNzg3ZjFkYThjZWI1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Nm2z3DjBgEMBlWqXLuJ1cXg5UTQujAYPKNL25rHjx2w'
    const apiKey = 'af5abaa649c5688e9d56d5410fc78240'; // Substitua pelo seu API key do TMDb
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            data.results.forEach(movie => {
                const colDiv = document.createElement('div');
                colDiv.className = 'col-md-4';
  
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card movie-item';
  
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
                img.className = 'card-img-top';
  
                cardDiv.appendChild(img);
                colDiv.appendChild(cardDiv);
                movieList.appendChild(colDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
 });