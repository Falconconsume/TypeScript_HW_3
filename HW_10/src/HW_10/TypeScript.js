// У вас є дві сутності - список фільмів і список категорій фільмів.
function filterMovies(movies, filter) {
    return movies.filter(function (movie) {
        return (!filter.dateOfPublish || movie.dateOfPublish === filter.dateOfPublish) &&
            (!filter.listOfAwards || movie.listOfAwards.every(function (award) { return movie.listOfAwards.includes(award); })) &&
            (!filter.name || movie.name.includes(filter.name)) &&
            (!filter.rating || movie.rating >= filter.rating);
    });
}
function filterCategory(categories, filter) {
    return categories.filter(function (e) { return (!e.name || e.name.includes(filter.name)); });
}
