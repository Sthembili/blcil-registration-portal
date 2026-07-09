CREATE TABLE "Registration" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "dateOfBirth" TEXT NOT NULL,
  "age" INTEGER NOT NULL,
  "gender" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "town" TEXT NOT NULL,
  "attending" TEXT NOT NULL,
  "days" TEXT,
  "department" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "accommodation" TEXT NOT NULL,
  "diet" TEXT,
  "health" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Admin" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);