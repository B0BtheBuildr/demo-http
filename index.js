const express = require("express");
const port = 3000;

const app = express();

app.use(express.json());

let users = [
  { name: "john", kidneys: [{ healthy: false }, { healthy: true }] },
];

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let healthyKidneys = johnKidneys.filter((kidney) => {
    return kidney.healthy;
  });
  const countOfHealthy = healthyKidneys.length;
  const countOfUnhealthy = numberOfKidneys - countOfHealthy;
  res.json({ numberOfKidneys, countOfHealthy, countOfUnhealthy });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json({ msg: "Done" });
});

app.put("/", (req, res) => {
  users[0].kidneys.forEach((kidney) => {
    kidney.healthy = true;
  });
  res.json({ msg: "Done" });
});

app.delete("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  let unhealthyKidneys = johnKidneys.filter((kidney) => {
    return !kidney.healthy;
  });
  if (unhealthyKidneys.length === 0) {
    res.status(411).json({ msg: "no unhealthy kidneys" });
  }
  const newKidneys = users[0].kidneys.filter((kidney) => {
    return kidney.healthy;
  });
  users[0].kidneys = newKidneys;
  res.json({ msg: "Done" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
