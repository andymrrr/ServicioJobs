import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(currentTab);

  useEffect(() => {
    const savedTab = localStorage.getItem('selectedTab');
    if (savedTab) {
      setSelected(Number(savedTab));
    }
  }, []);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    localStorage.setItem('selectedTab', tab.toString());
    // Puedes redirigir a una ruta diferente si cada tab representa una página
    // navigate(`/ruta-del-tab-${tab}`);
    navigate(location.pathname); // refresco "simulado"
  };

  return (
    <div
      className={`
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
        grid-cols-${tabOptions.length}
      `}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
