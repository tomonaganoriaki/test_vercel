"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error, { tags: { repeat: true } });
  }, [error]);

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  );
}
