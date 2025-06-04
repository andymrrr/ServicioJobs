import { ReactNode } from 'react';
import PageTitle from './PageTitle';

interface RouteWrapperProps {
  title: string;
  children: ReactNode;
}

const RouteWrapper = ({ title, children }: RouteWrapperProps) => {
  return (
    <>
      <PageTitle title={title} />
      {children}
    </>
  );
};

export default RouteWrapper; 