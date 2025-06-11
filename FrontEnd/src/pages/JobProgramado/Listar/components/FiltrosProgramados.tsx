import React from 'react';
import { Input, Select, Button, Space, Card } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

const { Option } = Select;

interface FiltrosProgramadosProps {
  busqueda: string;
  nombre: string;
  metodoHttps?: number;
  estadoEjecucion?: number;
  onBusquedaChange: (valor: string) => void;
  onNombreChange: (valor: string) => void;
  onMetodoHttpChange: (valor: number | undefined) => void;
  onEstadoEjecucionChange: (valor: number | undefined) => void;
  onLimpiarFiltros: () => void;
  onBuscar: () => void;
}

const FiltrosProgramados: React.FC<FiltrosProgramadosProps> = ({
  busqueda,
  nombre,
  metodoHttps,
  estadoEjecucion,
  onBusquedaChange,
  onNombreChange,
  onMetodoHttpChange,
  onEstadoEjecucionChange,
  onLimpiarFiltros,
  onBuscar,
}) => {
  return (
    <Card 
      title="Filtros de búsqueda" 
      size="small" 
      className="mb-4"
      extra={
        <Space>
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={onBuscar}
          >
            Buscar
          </Button>
          <Button 
            icon={<ClearOutlined />}
            onClick={onLimpiarFiltros}
          >
            Limpiar
          </Button>
        </Space>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Búsqueda general
          </label>
          <Input
            placeholder="Buscar en todos los campos..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            allowClear
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre específico
          </label>
          <Input
            placeholder="Nombre del job..."
            value={nombre}
            onChange={(e) => onNombreChange(e.target.value)}
            allowClear
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Método HTTP
          </label>
          <Select
            placeholder="Seleccionar método"
            value={metodoHttps}
            onChange={onMetodoHttpChange}
            allowClear
            className="w-full"
          >
            <Option value={1}>GET</Option>
            <Option value={2}>POST</Option>
            <Option value={3}>PUT</Option>
            <Option value={4}>DELETE</Option>
            <Option value={5}>PATCH</Option>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de Ejecución
          </label>
          <Select
            placeholder="Seleccionar estado"
            value={estadoEjecucion}
            onChange={onEstadoEjecucionChange}
            allowClear
            className="w-full"
          >
            <Option value={1}>Pendiente</Option>
            <Option value={2}>En ejecución</Option>
            <Option value={3}>Completado</Option>
            <Option value={4}>Fallido</Option>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default FiltrosProgramados; 