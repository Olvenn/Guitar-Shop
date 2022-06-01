import { ReactNode } from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

type LayoutProps = {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
