import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Stock Management System",
  description: "Manage items, stock entries, and ledger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
