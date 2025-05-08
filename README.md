# Flow

**Flow** is our developer productivity CLI built to automate our common backend tasks in Node.js + Express + TypeScript projects. It helps you scaffold modules, manage entities, seed your database, and more — all from the command line.

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

## 🧪 Commands

### Create Module - alias: flow c m <name>
Create a new module (controller + router in a directory)

```bash
flow create module <name>
```

### Create Router - alias: flow c r <name>
Create a new router

```bash
flow create router <name>
```

### Create Controller - alias: flow c c <name>
reate a new controller

```bash
flow create controller <name> --methods list,store,update,destroy
```

### Create Middleware – alias: flow c mi <name>
Create an empty middleware

```bash
flow create middleware <name>
```


### Create Multer Middleware – alias: flow c mi <name> --multer
Create a file upload middleware using Multer

```bash
flow create middleware upload --multer
```


### Create Entity – alias: flow c e <name>
Create a new TypeORM entity

```bash
flow create entity user
```

### Generate Keys – alias: flow g k
Generate encryption key pairs

```bash
flow generate keys
```

### Generate .env File – alias: flow g e
Generate .env and .env.example files (with empty values)

```bash
flow generate env
```

### Seed Database – alias: flow db seed
Seed the database using project seeders, runs all seeds if name not specified

```bash
flow database seed <name>
```


### Create Seed File – alias: flow db seed --create
Create a new seed file stub in the project

```bash
flow database seed <name> --create
```
