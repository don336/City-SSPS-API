import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, allow access to the next middleware or route handler
    return next();
  }

  // User is not authenticated, send an error message and redirect to the login page
  res.status(401).json({ message: "Unauthorized" });
};

export default isAuthenticated;
