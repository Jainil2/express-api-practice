import {
  readUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../repositories/usersRepository.js";

export async function handleCreateUser(
  req,
  res
) {
  try{
    const user = req.body;

    if(!user.name) {
      res.status(400).send("Name is required");
      return;
    }
    if(!user.age) {
      res.status(400).send("Age is required");
      return;
    }
    if(!user.email) {
      res.status(400).send("Email is required");
      return;
    }

    await createUser(user);
    res.status(201).send("User created successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.stack);
      res.status(500).send({ error: error.message });
      return;
    }
  }
}

export async function handleReadUsers(req, res) {
  try {
    const users = await readUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.stack);
      res.status(500).send({ error: error.message });
      return;
    }
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const user = req.body;

    if (!user) {
      res.status(400).send("User is required");
      return;
    }

    await updateUser(user);
    res.status(200).send("User updated successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.stack);
      res.status(500).send({ error: error.message });
      return;
    }
  }
}

export async function handleDeleteUser(req, res) {  
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).send("Email is required");
      return;
    }

    await deleteUser(email);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating user:", error.stack);
      res.status(500).send({ error: error.message });
      return;
    }  
  }
}