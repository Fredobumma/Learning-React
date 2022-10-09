import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { getHooks } from "../utilities/getHooks";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.optional(),
    title: Joi.string().max(30).required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(5)
      .required()
      .label("Daily Rental Rate"),
    publishDate: Joi.optional(),
  };

  componentDidMount() {
    const {
      params: { id },
      navigate,
    } = this.props;

    const existingMovie = getMovie(id);
    const data = existingMovie
      ? this.mapToViewModel(existingMovie)
      : this.state.data;

    if (!existingMovie && id !== "new") {
      return setTimeout(() => {
        navigate("/not-found", "replace");
      }, 0);
    }

    this.setState({ data });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  render() {
    const {
      params: { id },
    } = this.props;

    return (
      <div>
        <h1>Movie Form {id === "new" ? null : id}</h1>
        <form className="mt-5 w-75" onSubmit={this.handleSubmit}>
          {this.renderInput(
            "title",
            "Title",
            "text",
            "organization-title",
            "on"
          )}
          {this.renderDropDownList(
            "genre",
            "Genre",
            "",
            ...getGenres().map((g) => g.name)
          )}
          {this.renderInput("dailyRentalRate", "Rate", "number", "on")}
          {this.renderInput("numberInStock", "Number in Stock", "number", "on")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.navigate("/movies");
  };
}

export default getHooks(MovieForm);
