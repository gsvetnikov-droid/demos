// Prints a bcrypt hash for ADMIN_PASSWORD_HASH. Usage:
//   npm run hash-password -- 'your-password'
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Usage: npm run hash-password -- 'your-password'");
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log(hash);
});
