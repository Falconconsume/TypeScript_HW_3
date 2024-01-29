// У вас є дві сутності - список фільмів і список категорій фільмів.

// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.

// Категорія містить поля: назва і фільми.

// У кожного списку є пошук за ім'ям (це, по суті, фільтрація), у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.

// У нас визначено три типи фільтрів:

// Фільтр відповідності має поле filter
// Фільтр діапазону має поле filter і filterTo
// Фільтр пошуку за значеннями має поле values
// Кожен список містить стан його фільтрів, який може бути змінений тільки методом applySearchValue 
// або applyFiltersValue (за наявності додаткових фільтрів)

// Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і типи, щоб зробити ваше рішення типобезпечним. 
// Реалізація всіх методів не є необхідною - це за бажанням.

interface IMovies {
    name: string;
    dateOfPublish: number;
    rating: number;
    listOfAwards: string[];
}

interface ICategory {
    name: string;
    movies: IMovies[];
}

interface IFilter {
    name:string;
    dateOfPublish?: number;
    rating?: number;
    listOfAwards?: string[];
}

interface IConformity {
    filter: Partial<IMovies>;
}

interface IRange {
    filter: Partial<IMovies>;
    filterto: Partial<IMovies>;
}

interface ISearchValue {
    values: Partial<IMovies>[];
}

type FilterValue = IRange | IConformity | ISearchValue;

interface IMoviesList {
    movies: IMovies[];
    filters: FilterValue[];
    applySearchValue: (value: string) => void;
    applyFiltersValue: (value: FilterValue[]) => void;
}

interface ICategoryList {
    categories: ICategory[];
    filters: FilterValue[];
    applySearchValue: (value: string) => void;
    applyFiltersValue: (value: FilterValue[]) => void;
}


function filterMovies(movies: IMovies[], filter: IFilter): IMovies[] {
    return movies.filter((movie) => {
        return (!filter.dateOfPublish || movie.dateOfPublish === filter.dateOfPublish) && 
        (!filter.listOfAwards || movie.listOfAwards.every(award => movie.listOfAwards.includes(award))) &&
        (!filter.name || movie.name.includes(filter.name)) &&
        (!filter.rating || movie.rating >= filter.rating);
    })
}

function filterCategory(categories: ICategory[], filter: IFilter) : ICategory[] {
    return categories.filter((e) => (!e.name || e.name.includes(filter.name)))
}
