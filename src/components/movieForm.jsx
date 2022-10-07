import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { isString } from "lodash";
import HooksForm from "./common/hooksForm";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

const MovieForm = () => {
  const form = new HooksForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const existingMovie = getMovie(id);

  const [movie, setMovie] = useState(
    existingMovie || {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    }
  );
  const [errors, setErrors] = useState({});

  form.data = movie;
  form.errors = errors;
  form.setData = setMovie;
  form.setErrors = setErrors;

  form.schema = {
    _id: Joi.optional(),
    title: Joi.string().max(30).required().label("Title"),
    genre: isString(movie.genre)
      ? Joi.string().required().label("Genre")
      : Joi.any(),
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

  form.doSubmit = () => {
    saveMovie(movie);
    navigate("/movies");
  };

  useEffect(() => {
    if (!existingMovie && id !== "new")
      return navigate("/not-found", "replace");
  });

  return (
    <div>
      <h1>Movie Form {id === "new" ? null : id}</h1>
      <form className="mt-5 w-75" onSubmit={form.handleSubmit}>
        {form.renderInput("title", "Title", "text", "organization-title", "on")}
        {form.renderDropDownList(
          "genre",
          "Genre",
          "",
          ...getGenres().map((g) => g.name)
        )}
        {form.renderInput("dailyRentalRate", "Rate", "number", "on")}
        {form.renderInput("numberInStock", "Number in Stock", "number", "on")}
        {form.renderButton("Save")}
      </form>
    </div>
  );
};

export default MovieForm;
