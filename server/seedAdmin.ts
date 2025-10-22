/**
 * Seed script to create initial admin user
 * Run with: tsx server/seedAdmin.ts
 */

import { upsertAdminCredential } from "./auth";

async function seedAdmin() {
  console.log("Creating initial admin user...");
  
  const email = "danielblanchard@keemail.me";
  const password = "RichardNixon123!";
  const name = "Vinicius M. Blanchard";

  try {
    await upsertAdminCredential(email, password, name);
    console.log(`✓ Admin user created successfully:`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Name: ${name}`);
  } catch (error) {
    console.error("✗ Failed to create admin user:", error);
    process.exit(1);
  }

  process.exit(0);
}

seedAdmin();

