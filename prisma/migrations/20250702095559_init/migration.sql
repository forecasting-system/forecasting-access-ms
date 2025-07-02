-- CreateTable
CREATE TABLE "Forecast" (
    "id" TEXT NOT NULL,
    "model_version" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "date" TIMESTAMP(3) NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "forecastId" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("forecastId","date")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_forecastId_fkey" FOREIGN KEY ("forecastId") REFERENCES "Forecast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
