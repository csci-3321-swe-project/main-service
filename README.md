# Main Service

This service is a RESTful API for a class registration system.

## Prerequisites

- [NodeJS 18](https://nodejs.org)
- [MongoDB Instance](#creating-database)
- [Prisma SDK](#generating-data-layer-sdk)

## Creating Database

A MongoDB instance can be [installed locally](https://www.mongodb.com/docs/manual/installation/) or provisioned through a cloud provider such as [MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/).

## Generating Data Layer SDK

A data layer SDK is generated using [Prisma](https://www.prisma.io/). To start, point the `DATABASE_URL` environment variable towards your database. Then, run `npm run gen` to generate an SDK attached to the `@prisma/client` package based off the schema file defined at `prisma/schema.prisma` and push schema changes to the database.

## Environment Variables

Environment variables are defined in a `.env` file. This file is defined locally, and not tracked in source control. To define variables for your environment, copy the `.env.template` file contents to a new file called `.env`, and fill in the variables with your definitions.

## Getting Started

- Run `npm i`
- Run `npm run gen`

## Running Development Server

To run the development server, run `npm run dev`.

## Running Production Server

To run the production server, build source files by running `npm run build`. Then, run `npm run start`.
> Extra documentation available upon running the production server at `http://localhost:{port}/docs` where `port` is defined in the `.env` file.

moved it into somewheererererererere
