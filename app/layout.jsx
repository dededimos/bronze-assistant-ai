// app/layout.jsx
import './globals.css'; // <-- προσθέτουμε το global CSS

export const metadata = {
  title: 'Bronze Assistant AI',
  description: 'Configure your cabin easily and export directly to BronzeApp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
