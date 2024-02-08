import express, { Request, Response } from "express";
import path from "path";
import uploadCv from "./uploadCv";
import getJobs from "./getJobs";
import error from "./middleware/error";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_, res: Response) => {
  res.render("index", { title: "Home" });
});

app.get("/jobs", async (req: Request, res: Response) => {
  const { location, job_type, level, skip, limit } = req.query;
  const params = {
    location: location ? location.toString() : "",
    job_type: job_type ? job_type.toString() : "",
    level: level ? level.toString() : "",
    skip: skip ? parseInt(skip.toString(), 10) : 0,
    limit: limit ? parseInt(limit.toString(), 10) : 10,
  };

  const jobs = await getJobs(params);
  if (!jobs) {
    res.status(500).send("Error");
    return;
  }
  res.render("jobs", { jobs, title: "Jobs"});
});

app.post("/", uploadCv(), async (req: Request, res: Response) => {
  try {
    const { file } = req;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const jobs = await getJobs();
    res.render("jobs", { jobs, title : "Jobs"});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use((_, res: Response) => {
  res.status(404).render("error", { error: "Page not found" });
});

app.use(error);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
