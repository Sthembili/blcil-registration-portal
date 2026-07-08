-- CreateTable
CREATE TABLE "Registration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
