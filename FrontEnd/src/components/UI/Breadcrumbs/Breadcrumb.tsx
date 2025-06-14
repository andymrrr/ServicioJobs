import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { RightOutlined } from '@ant-design/icons';

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white dark:bg-boxdark rounded-lg shadow-sm border border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
          <FaHome className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-title-lg font-bold text-black dark:text-white tracking-tight">
          {pageName}
        </h2>
      </div>

      {/* Navegación Breadcrumb */}
      <nav className="flex items-center" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li className="flex items-center">
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-bodydark1 dark:text-bodydark hover:text-primary dark:hover:text-primary transition-colors duration-200 rounded-md hover:bg-gray-50 dark:hover:bg-meta-4"
            >
              <FaHome className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li className="flex items-center">
            <RightOutlined className="h-4 w-4 text-bodydark2 dark:text-bodydark mx-1" />
          </li>
          
          <li className="flex items-center">
            <span className="px-3 py-2 text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-md border border-primary/20">
              {pageName}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
