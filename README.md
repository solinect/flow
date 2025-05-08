# Flow

**Flow** is a developer productivity CLI built to automate common backend tasks in Node.js + Express + TypeScript projects. It helps you scaffold modules, manage entities, seed your database, and more — all from the command line.

---

## 🚀 Features

- Quickly generate routers, controllers, middlewares, and entities.
- Generate `.env` files or encryption keys.
- Seed your database with minimal setup, using project-defined seed files.
- Streamline backend project setup with consistent structure.

---

## 📦 Installation

Clone the repository and link the CLI globally - (at least for now):

```bash
git clone https://github.com/solinect/flow.git
cd flow
npm install
npm run build
npm link
```

---

### Create Module - alias: flow c m <name>
Description: Create a new module (controller + router in a directory)

```bash
flow create module <name>
```

### Create Module - alias: flow c r <name>
Description: Create a new router

```bash
flow create router <name>
```

### Create Module - alias: flow c c <name>
Description: Create a new controller

```bash
flow create controller <name> --methods list,store,update,destroy
```

### Create Middleware – alias: flow c mi <name>
Description: Create an empty middleware

```bash
flow create middleware <name>
```


### Create Multer Middleware – alias: flow c mi <name> --multer
Description: Create a file upload middleware using Multer

```bash
flow create middleware upload --multer
```


### Create Entity – alias: flow c e <name>
Description: Create a new TypeORM entity

```bash
flow create entity user
```

### Generate Keys – alias: flow g k
Description: Generate encryption key pairs

```bash
flow generate keys
```

### Generate .env File – alias: flow g e
Description: Generate .env and .env.example files (with empty values)

```bash
flow generate env
```

### Seed Database – alias: flow db seed
Description: Seed the database using project seeders, runs all seeds if name not specified

```bash
flow database seed <name>
```


### Create Seed File – alias: flow db seed --create
Description: Create a new seed file stub in the project

```bash
flow database seed <name> --create
```

### Create Seed File – alias: flow db seed --create
Description: Create a new seed file stub in the project

```bash
flow database seed
```
