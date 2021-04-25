import express, { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { Db } from "mongodb";
import nunjucks from "nunjucks";

export function makeApp(db: Db): core.Express {
  const app = express();

  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });

  app.set("view engine", "njk");

  app.get("/", async (request: Request, response: Response) => {
    try {
    const games = await db.collection("games").find({}).toArray()
    response.render("index", {games})
    } catch (error) {
        console.log(error);
        response.status(500).end();
    }
  });

  return app;
}
