import '../styles/globals.css';

export const metadata = {
  title: 'Bronze Assistant AI',
  description: 'Configure your cabin easily and export directly to BronzeApp',
}

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="p-4 bg-white shadow-md mb-4">
          <h1 className="text-2xl font-bold text-center text-[#1c1c1c]">
            🛠️ Bronze Assistant AI
          </h1>
        </header>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}