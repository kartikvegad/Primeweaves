import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");

const defaultUsers: StoredUser[] = [
  {
    id: "demo-user",
    name: "Demo User",
    email: "demo@primeweaves.com",
    passwordHash:
      "$2b$10$GG198Ajvf2xKW.VYtwYx3eqrfGpdvRivGLll6VAfWJ2/YKp9Ji3v2",
    createdAt: "2018-01-01T00:00:00.000Z",
  },
];

async function ensureUsersFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, JSON.stringify(defaultUsers, null, 2), "utf8");
  }
}

export async function getUsers(): Promise<StoredUser[]> {
  await ensureUsersFile();
  const raw = await fs.readFile(usersFile, "utf8");
  return JSON.parse(raw) as StoredUser[];
}

async function saveUsers(users: StoredUser[]) {
  await ensureUsersFile();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string) {
  const users = await getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const users = await getUsers();
  const user: StoredUser = {
    id: `user_${Date.now()}`,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: await bcrypt.hash(input.password, 10),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await saveUsers(users);
  return { id: user.id, name: user.name, email: user.email };
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
