import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { autoPaginate, paginate } from "../utilities/paginate";
import ListGroup from "./common/ListGroup";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchValue: "",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchValue: "",
    });
  };

  handleSearch = ({ currentTarget: { value } }) => {
    this.setState({
      searchValue: value,
      currentPage: 1,
      selectedGenre: null,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const { movies: allMovies, currentPage: activePage, pageSize } = this.state;
    const movies = allMovies.filter((m) => m._id !== movie._id);
    const currentPage = autoPaginate(movies, activePage, pageSize);
    this.setState({ currentPage, movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("post is invalid and cannot be deleted");

      this.setState({ movies: allMovies, currentPage: activePage });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      searchValue,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    else if (searchValue)
      filtered = allMovies.filter(
        (m) =>
          m.title.toUpperCase().startsWith(searchValue.toUpperCase()) ||
          m.title.toUpperCase().includes(searchValue.toUpperCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  }

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchValue,
    } = this.state;
    const { user } = this.props;

    const { totalCount, movies } = this.getPagedData();

    if (!allMovies.length)
      return (
        <div>
          <p>
            There are no movies in the database.
            {!user && "Please Login to add movie."}
          </p>
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-4">
              Add Movie
            </Link>
          )}
        </div>
      );
    return (
      <main className="row">
        <div className="col-3 mb-4 movies-listgroup">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new" className="btn btn-primary mb-4">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movie(s) in the database.</p>
          <SearchBox
            extraClasses="w-75 mb-3"
            value={searchValue}
            onSearch={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </main>
    );
  }
}

export default Movies;

// Search should allow both Upper and Lower Case
