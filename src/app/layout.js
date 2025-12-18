import ClientLayout from '@/components/ClientLayout';
import './globals.css';

export const metadata = {
  title: 'DevKit - IT Tools',
  description: 'Developer utilities and tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
