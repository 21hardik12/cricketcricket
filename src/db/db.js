const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const db = global.prisma ?? prismaClientSingleton();

module.exports = db;

if (process.env.NODE_ENV !== 'production') global.prisma = db;
