const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      {
        const contact = await getContactById(id);
        console.log("Contact: ");
        console.table(contact);
      }
      break;

    case "add":
      {
        const contact = await addContact(name, email, phone);
        console.log("Contact has been added: ");
        console.table(contact);
      }
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(
        removedContact
          ? `Contact: ${JSON.stringify(
              removedContact,
              null,
              2
            )} has been removed`
          : `Contact by ID: ${id} not found`
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
