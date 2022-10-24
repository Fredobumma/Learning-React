import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Profile from "./components/profile";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import * as auth from "./services/authService";
import { getHooks } from "./utilities/getHooks";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { location } = this.props;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/movies" element={<Movies user={user} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/movies/:id"
              element={
                (auth.getCurrentUser() && <MovieForm />) || (
                  <Navigate to="/login" state={{ from: location }} />
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/register"
              element={(!user && <RegisterForm />) || <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={(!user && <LoginForm />) || <Navigate to="/" />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default getHooks(App);
