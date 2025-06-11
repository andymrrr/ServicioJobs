import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Tag, Button, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { JobProgramado } from '../../../../Nucleo/Dominio/Model';

interface AccionesProgramadosProps {
  onEditar: (job: JobProgramado) => void;
  onEliminar: (job: JobProgramado) => void;
  onEjecutar: (job: JobProgramado) => void;
}

export const crearColumnasProgramados = (acciones: AccionesProgramadosProps): ColumnsType<JobProgramado> => [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    width: 200,
    render: (text: string, record: JobProgramado) => (
      <div>
        <div className="font-medium text-gray-900">{text}</div>
        <div className="text-sm text-gray-500 truncate" title={record.descripcion}>
          {record.descripcion}
        </div>
      </div>
    ),
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    width: 300,
    render: (url: string) => (
      <Tooltip title={url}>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 truncate block"
        >
          {url}
        </a>
      </Tooltip>
    ),
  },
  {
    title: 'Método HTTP',
    dataIndex: 'metodoHttp',
    key: 'metodoHttp',
    width: 120,
    align: 'center',
    render: (metodo: number) => {
      const metodos = {
        1: { text: 'GET', color: 'blue' },
        2: { text: 'POST', color: 'green' },
        3: { text: 'PUT', color: 'orange' },
        4: { text: 'DELETE', color: 'red' },
        5: { text: 'PATCH', color: 'purple' },
      };
      const metodoInfo = metodos[metodo as keyof typeof metodos] || { text: 'Desconocido', color: 'default' };
      
      return (
        <Tag color={metodoInfo.color}>
          {metodoInfo.text}
        </Tag>
      );
    },
  },
  {
    title: 'Crontab',
    dataIndex: 'crontab',
    key: 'crontab',
    width: 120,
    render: (crontab: string) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
        {crontab}
      </code>
    ),
  },
  {
    title: 'Estado',
    key: 'estado',
    width: 120,
    align: 'center',
    render: (_, record: JobProgramado) => (
      <div className="space-y-1">
        <Tag color={record.habilitado ? 'success' : 'error'}>
          {record.habilitado ? 'Habilitado' : 'Deshabilitado'}
        </Tag>
        {record.estadoEjecucion && (
          <div>
            <Tag color={getEstadoEjecucionColor(record.estadoEjecucion)}>
              {getEstadoEjecucionTexto(record.estadoEjecucion)}
            </Tag>
          </div>
        )}
      </div>
    ),
  },
  {
    title: 'Última Ejecución',
    key: 'ultimaEjecucion',
    width: 150,
    render: (_, record: JobProgramado) => (
      <div className="text-sm">
        {record.ultimaEjecucion ? (
          <div>
            <div>{formatearFecha(record.ultimaEjecucion)}</div>
            <div className="text-gray-500">
              Reintentos: {record.reintentos}/{record.reintentosPermitidos}
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Sin ejecutar</span>
        )}
      </div>
    ),
  },
  {
    title: 'Acciones',
    key: 'acciones',
    width: 150,
    align: 'center',
    render: (_, record: JobProgramado) => (
      <Space size="small">
        <Tooltip title="Ejecutar ahora">
          <Button
            type="text"
            icon={<PlayCircleOutlined />}
            size="small"
            onClick={() => acciones.onEjecutar(record)}
            className="text-green-600 hover:text-green-800"
            disabled={!record.habilitado}
          />
        </Tooltip>
        <Tooltip title="Editar">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => acciones.onEditar(record)}
            className="text-blue-600 hover:text-blue-800"
          />
        </Tooltip>
        <Tooltip title="Eliminar">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => acciones.onEliminar(record)}
            className="text-red-600 hover:text-red-800"
          />
        </Tooltip>
      </Space>
    ),
  },
];

// Funciones auxiliares
const getEstadoEjecucionColor = (estado: number): string => {
  const colores = {
    1: 'default', // Pendiente
    2: 'processing', // En ejecución
    3: 'success', // Completado
    4: 'error', // Fallido
  };
  return colores[estado as keyof typeof colores] || 'default';
};

const getEstadoEjecucionTexto = (estado: number): string => {
  const estados = {
    1: 'Pendiente',
    2: 'En ejecución',
    3: 'Completado',
    4: 'Fallido',
  };
  return estados[estado as keyof typeof estados] || 'Desconocido';
};

const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}; 