import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TablaPaginada from '../components/Tables/TablaPaginada';
import { useState } from 'react';
import { generarColumnas } from '../components/Tables/generarColumnas';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  estado: string;
}

const Tables = () => {
  // Datos de ejemplo
  const datosCompletos: Usuario[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    nombre: `Usuario ${index + 1}`,
    email: `usuario${index + 1}@ejemplo.com`,
    rol: index % 2 === 0 ? 'Admin' : 'Usuario',
    estado: index % 3 === 0 ? 'Activo' : 'Inactivo',
  }));

  const [paginaActual, setPaginaActual] = useState(1);
  const [tamanioPagina, setTamanioPagina] = useState(10);

  // Definir las columnas
  const columnas = generarColumnas<Usuario>({
    id: 'ID',
    nombre: 'Nombre',
    email: 'Email',
    rol: 'Rol',
    estado: 'Estado',
  });

  // Calcular el inicio y fin de los datos para la página actual
  const inicio = (paginaActual - 1) * tamanioPagina;
  const fin = inicio + tamanioPagina;
  const datosPaginados = datosCompletos.slice(inicio, fin);

  const handlePageChange = (nuevaPagina: number, nuevoTamanio: number) => {
    setPaginaActual(nuevaPagina);
    setTamanioPagina(nuevoTamanio);
  };

  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Tabla de Usuarios
          </h4>
          
          <TablaPaginada<Usuario>
            datos={datosPaginados}
            columnas={columnas}
            total={datosCompletos.length}
            paginaActual={paginaActual}
            tamanioPagina={tamanioPagina}
            onPageChange={handlePageChange}
            claveFila="id"
          />
        </div>
      </div>
    </>
  );
};

export default Tables;
