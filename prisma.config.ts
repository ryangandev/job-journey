import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // The CLI (migrate, introspection, studio) uses the direct, non-pooled connection.
    // The app runtime uses the pooled connection through the driver adapter in src/lib/db.ts.
    // `process.env` rather than `env()` from prisma/config: `env()` throws when the variable is
    // unset, which would break `prisma generate` (postinstall) on machines/CI without a DB URL.
    url: process.env.POSTGRES_URL_NON_POOLING,
  },
});
