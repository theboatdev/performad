/**
 * Root layout for App Router routes (e.g. /studio).
 * Pages Router routes continue to use pages/_app.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
