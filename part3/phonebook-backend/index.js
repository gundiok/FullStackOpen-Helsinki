require("dotenv").config();

const express = require("express");
const Person = require("./models/phonebook");

const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :response-time[digits] :body"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const time = new Date();
  Person.countDocuments({}).then((count) => {
    response.send(`<p>Phonebook has info for ${count} people</p>
        <p>${time}</p>
        `);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(409).json({ error: "name must be unique" });
    }
  });

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
