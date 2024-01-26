import express, { Request, Response } from "express";
import path from "path";
import uploadCv from "./uploadCv";
import getJobs from "./getJobs";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_, res: Response) => {
  res.render("index");
});

app.get("/jobs", async (_, res: Response) => {
  const jobs = await getJobs();
  if (!jobs) {
    res.status(500).send("Error");
    return;
  }
  res.render("jobs", { jobs });
});

app.post("/", uploadCv(), async (req: Request, res: Response) => {
  try {
    const { file } = req;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const jobs = await getJobs(file);
    res.render("jobs", { jobs });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
