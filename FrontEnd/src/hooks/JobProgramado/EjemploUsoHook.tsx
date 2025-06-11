import React, { useState } from 'react';
import { useBusquedaPaginada } from './useBusquedaPaginada';

const EjemploListaJobsProgramados: React.FC = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidadPorPagina, setCantidadPorPagina] = useState(10);
  const [metodoHttps, setMetodoHttps] = useState<number | undefined>();
  const [estadoEjecucion, setEstadoEjecucion] = useState<number | undefined>();

  const {
    datos,
    totalRegistros,
    totalPaginas,
    isLoading,
    isError,
    error,
    tienePaginaAnterior,
    tienePaginaSiguiente,
    refetch
  } = useBusquedaPaginada({
    pagina: paginaActual,
    cantidadPorPagina,
    busqueda,
    nombre,
    ordenar: 'nombre',
    metodoHttps,
    estadoEjecucion
  });

  const handleBuscar = () => {
    setPaginaActual(1); // Resetear a la primera página al buscar
  };

  const handleCambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setNombre('');
    setMetodoHttps(undefined);
    setEstadoEjecucion(undefined);
    setPaginaActual(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Cargando jobs programados...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error al cargar los datos: {error?.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Jobs Programados</h1>
      
      {/* Filtros de búsqueda */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Búsqueda general
            </label>
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre específico
            </label>
            <input
              type="text"
              placeholder="Nombre del job..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Método HTTP
            </label>
            <select
              value={metodoHttps || ''}
              onChange={(e) => setMetodoHttps(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="1">GET</option>
              <option value="2">POST</option>
              <option value="3">PUT</option>
              <option value="4">DELETE</option>
              <option value="5">PATCH</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado de Ejecución
            </label>
            <select
              value={estadoEjecucion || ''}
              onChange={(e) => setEstadoEjecucion(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="1">Pendiente</option>
              <option value="2">En ejecución</option>
              <option value="3">Completado</option>
              <option value="4">Fallido</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleBuscar}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="mb-4 text-sm text-gray-600">
        Mostrando {datos.length} de {totalRegistros} registros
      </div>

      {/* Lista de jobs */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método HTTP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Crontab
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datos.map((job) => (
              <tr key={job.idProgramado} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {job.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {job.descripcion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    {job.url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.metodoHttp === 1 ? 'GET' : 
                   job.metodoHttp === 2 ? 'POST' : 
                   job.metodoHttp === 3 ? 'PUT' : 
                   job.metodoHttp === 4 ? 'DELETE' : 
                   job.metodoHttp === 5 ? 'PATCH' : 'Desconocido'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.crontab}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    job.habilitado 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {job.habilitado ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Registros por página:</span>
          <select
            value={cantidadPorPagina}
            onChange={(e) => {
              setCantidadPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCambiarPagina(paginaActual - 1)}
            disabled={!tienePaginaAnterior}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <span className="px-4 py-2 text-sm text-gray-700">
            Página {paginaActual} de {totalPaginas}
          </span>
          
          <button
            onClick={() => handleCambiarPagina(paginaActual + 1)}
            disabled={!tienePaginaSiguiente}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default EjemploListaJobsProgramados; 