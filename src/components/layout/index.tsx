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
      <main className="flex w-full flex-col items-center justify-center py-16">
        {children}
      </main>
    </>
  );
};

export default Layout;
