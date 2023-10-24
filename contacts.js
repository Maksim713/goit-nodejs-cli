const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  return await fs
    .readFile(contactsPath, "utf-8")
    .then((r) => JSON.parse(r))
    .catch(console.error);
}

async function getContactById(contactId) {
  const list = await listContacts().catch(console.error);
  const contact = list.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const list = await listContacts().catch(console.error);
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const removableContact = list[index];
  list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2)).catch();
  return removableContact;
}

async function addContact(name, email, phone) {
  const list = await listContacts().catch(console.error);
  const id = nanoid(5);
  const newContact = { id, name, email, phone };
  const newList = [...list, newContact];
  await fs
    .writeFile(contactsPath, JSON.stringify(newList, null, 2))
    .catch(console.error);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
