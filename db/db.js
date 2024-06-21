const { PrismaClient } = require("@prisma/client");

class PrismaDB {
  static getInstance() {
    if (!PrismaDB.instance) {
      PrismaDB.instance = new PrismaClient();
    }
    return PrismaDB.instance;
  }
}

module.exports = PrismaDB;
