// import prisma from "../prisma";
// // import bcrypt from "bcryptjs";

// export async function createUser(email, password, role) {
//   // const hashed = await bcrypt.hash(password, 10);
//   const user = await prisma.user.create({
//     data: { email, password, role },
//   });
//   return user;
// }

// export async function getUserByEmail(email) {
//   return prisma.user.findUnique({
//     where: { email },
//   });
// }
