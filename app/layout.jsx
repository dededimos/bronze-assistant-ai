import '../styles/globals.css';

// Στατική μεταδεδομένα.  Μην βάζεις `'use client'` εδώ.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
