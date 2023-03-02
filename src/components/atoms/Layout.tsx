import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex mt-5 flex-col items-center justify-center">
      <div className="w-[356px]">{children}</div>
    </div>
  );
};

export default Layout;
