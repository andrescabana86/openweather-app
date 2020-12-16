import { weather } from "./weather";
import express from "express";

const app = express();

app.use(express.static("dist"));

app.get("/api/weather", async (req, res) => {
  const query = req.query["q"];
  try {
    const result = await weather(query as string);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
