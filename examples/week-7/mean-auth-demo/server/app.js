/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: app.js
 * Description: Application file
 */

"use strict";

// Import the required modules
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const userRoutes = require("./routes/user/index"); // Import the user routes

const app = express(); // Create an Express app object

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static(path.join(__dirname, "../dist/mean-auth-demo-demo/browser"))); // Serve static files from the dist directory

app.use("/api/users", userRoutes); // Use the user routes

// Error handler
app.use((req, res, next) => {
  next(createError(404)); // Create a 404 error for any requests that don't match a route
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500); // Set the status code of the response to the error status code or 500

  // Send a JSON response with the error message and stack trace (if in development mode)
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined
  });
});

module.exports = app; // Export the app object so that it can be used in bin/www
