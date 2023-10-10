-- CreateTable
CREATE TABLE "ScrappedJob" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "passedDays" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "companyLogo" TEXT,
    "companyName" TEXT NOT NULL,

    CONSTRAINT "ScrappedJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactMessages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contactMessages_pkey" PRIMARY KEY ("id")
);
