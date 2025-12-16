import Sidebar from '@/components/Sidebar';
import './globals.css';

export const metadata = {
  title: 'DevKit - IT Tools',
  description: 'Developer utilities and tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, height: '100vh', overflowY: 'auto' }}>
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
