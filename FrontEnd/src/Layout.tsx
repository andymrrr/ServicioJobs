// src/layout/Layout.tsx

import { Sidebar, TopMenu } from "./componente";


export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <aside className="w-64 h-screen sticky top-0">
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col">
        <TopMenu />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
