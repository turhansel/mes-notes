import type { PropsWithChildren } from "react";
import Header from "./Header";
import Meta from "./Meta";
import type { MetaProps } from "./Meta";

const Layout: React.FC<PropsWithChildren<{ meta?: MetaProps }>> = ({
  meta,
  children,
}) => {
  return (
    <>
      <Meta {...meta} />
      <Header />
      <main className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100 py-16">
        {children}
      </main>
    </>
  );
};

export default Layout;
