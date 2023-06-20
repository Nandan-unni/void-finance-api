import express, { Express } from "express";

const Settings = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};

export default Settings;
