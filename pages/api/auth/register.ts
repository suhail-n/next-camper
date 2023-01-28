import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import prisma from "../../../lib/prisma";
import { validateEmail, validatePassword } from '../../../util/authValidation';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, firstName, lastName, passwordConfirmation } = req.body as {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
  };
  if (req.method === "POST") {
    if (!validateEmail(email)) {
      res.status(400).send("Email must be valid");
    }
    if (!validatePassword(password) || password !== passwordConfirmation) {
      res.status(400).send("Password must be valid");
    }
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      res.status(400).send("User already exists");
    }
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await hash(password, 10),
      },
    });
    res.status(201).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      id: user.id,
    });
  }
}
