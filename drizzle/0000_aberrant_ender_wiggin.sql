CREATE TABLE "garages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "garages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"createdAt" date NOT NULL,
	"deletedAt" date,
	"userId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"createdAt" date NOT NULL,
	"deletedAt" date,
	"expiredAt" date,
	"vehicleId" integer NOT NULL,
	"garageId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vehicles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"type" varchar NOT NULL,
	"createdAt" date NOT NULL,
	"deletedAt" date,
	"userId" varchar(255) NOT NULL
);
