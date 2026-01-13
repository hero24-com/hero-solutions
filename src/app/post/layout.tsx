import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
