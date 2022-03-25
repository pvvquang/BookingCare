import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("./src/public")); // setup link to static file as photo, img ..v.v
  app.set("view engine", "ejs"); // same as jsp-java , blade-php
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
