import bcrypt from "bcryptjs";

/**
 * CLI helper to generate a bcrypt hash for the admin password.
 * Usage:  npm run hash -- "YourStrongPassword"
 */
const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash -- "YourStrongPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log(hash);
