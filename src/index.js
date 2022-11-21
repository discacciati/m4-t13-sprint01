import express from "express";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

const port = 3000;

const users = [];

app.post("/user", (req, resp) => {
  const { email, name } = req.body;

  const userAlreadyExists = users.find((user) => user.email === email);

  if (userAlreadyExists) {
    return resp.status(400).json({
      error: "This email address is already being used",
    });
  }

  const newUser = {
    id: v4(),
    email,
    name,
  };

  users.push(newUser);

  return resp.status(201).json(newUser);
});

app.get("/", (req, resp) => {
  return resp.send("retornando string de teste");
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

export default app;
