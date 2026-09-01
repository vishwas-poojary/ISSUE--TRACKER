const dns = require("dns");
const mongoose = require("mongoose");

// Windows + some ISP IPv6 resolvers fail mongodb+srv lookups
// (querySrv ECONNREFUSED). Prefer public IPv4 DNS.
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set. Add it to backend/.env");
    }

    const conn = await mongoose.connect(uri, { family: 4 });
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
