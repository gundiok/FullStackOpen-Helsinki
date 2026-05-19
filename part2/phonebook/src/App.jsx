import { useState, useEffect } from "react";
import Filter from "./Filter";
import Form from "./Form";
import Persons from "./Persons";
import service from "./Services";
import Notification from "./Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPerson.name || !newPerson.number) return;

    // Check if the person already exists
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
    );

    if (existingPerson) {
      // Ask if the user wants to replace the number
      if (
        window.confirm(
          `${newPerson.name} is already added, replace the old number with a new one?`,
        )
      ) {
        await handleUpdate(existingPerson.id, newPerson);
      }
      return;
    }

    try {
      const response = await service.createPerson(newPerson);
      setPersons((prev) => [...prev, response]);

      setNotificationMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);

      setNewPerson({ name: "", number: "" });
    } catch (error) {
      alert("Failed to add a person");
    }
  };

  const handleDelete = async (id, name) => {
   
    try {
      await service.deletePerson(id);
      setPersons((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      setErrorMessage(
        `Information of ${name} has already been removed from the server`,
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleUpdate = async (id, updatedPerson) => {
    try {
      const updated = await service.updatePerson(id, updatedPerson);
      setPersons((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setNotificationMessage(`Updated ${updatedPerson.name}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch {
      alert("Failed to update person");
    }
  };

  useEffect(() => {
    service.fetchPersons().then((data) => setPersons(data));
  }, []);

  return (
    <div>
      <aside>
        <Notification message={notificationMessage} error={errorMessage} />
      </aside>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} />

      <h3>Add a new person</h3>
      <Form
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        value={newPerson}
        handleUpdate={handleUpdate}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
