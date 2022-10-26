import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { getMovie, saveMovie, updateMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { getHooks } from "../utilities/getHooks";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.optional(),
    title: Joi.string().min(5).max(30).required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
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

  async componentDidMount() {
    const {
      params: { id },
      navigate,
    } = this.props;

    const { data: genres } = await getGenres();
    this.setState({ genres });

    if (id === "new") return;

    try {
      const { data: existingMovie } = await getMovie(id);
      this.setState({ data: this.mapToViewModel(existingMovie) });
    } catch (error) {
      toast.error("The movie with the given ID was not found.");
      navigate("/not-found", "replace");
    }
  }

  mapToViewModel(movie) {
    return {
      title: movie.title,
      genreId: movie.genre.name,
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
            "genreId",
            "Genre",
            "",
            ...this.state.genres.map((g) => g.name)
          )}
          {this.renderInput("dailyRentalRate", "Rate", "number", "on")}
          {this.renderInput("numberInStock", "Number in Stock", "number", "on")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  doSubmit = async () => {
    const {
      params: { id },
    } = this.props;

    const { data, genres } = this.state;
    const obj = { ...data };

    const { _id } = genres.find((g) => g.name === data.genreId);
    obj.genreId = _id;

    if (id === "new") await saveMovie(obj);
    else await updateMovie(obj, id);

    this.props.navigate("/movies");
  };
}

export default getHooks(MovieForm);
