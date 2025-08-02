export const metadata = {
  title: 'Bronze Assistant',
  description: 'AI Assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
