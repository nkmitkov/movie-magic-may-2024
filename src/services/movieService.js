const Movie = require("../models/Movie");

const movies = [
    {
        _id: '1',
        title: 'Jungle Cuise',
        genre: 'Adventure',
        director: 'Jaume Collet-Serra',
        year: '2021',
        imageUrl: '/img/jungle-cruise.jpeg',
        rating: '4',
        description: 'Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans.'
    },
    {
        _id: '2',
        title: 'Home Alone',
        genre: 'Comedy',
        director: 'Chris Columbus',
        year: '1992',
        imageUrl: '/img/home-alone.jpeg',
        rating: '4',
        description: 'Eight-year-old Kevin is accidentally left behind when his family leaves for France. At first, he\'s happy to be in charge; but when thieves try to break into his home, he puts up a fight like no other.'
    }
];

exports.getAll = () => {
    // return [...movies];
    return movies.slice();
};

exports.search = (title, genre, year) => {
    let result = movies.slice();

    if (title) {
        result = result.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
    }
    
    if (genre) {
        result = result.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
    }
    
    if (year) {
        result = result.filter((movie) => movie.year === year);
    }

    return result;
};

exports.getById = (id) => {
    const movie = movies.find((movie) => movie._id == id);

    return movie;
};

exports.create = async (movieData) => {
    // return Movie.create(movieData);

    const result = await Movie.create(movieData);
    return result;
};
