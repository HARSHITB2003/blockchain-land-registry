import "./globals.css";

export const metadata = {
  title: "भारत भूमि रजिस्ट्री | Blockchain Land Registry India",
  description: "Blockchain-based property buying and selling platform for India. Shared ledger for Government, Owners, Buyers & Banks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
