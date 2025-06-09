import { Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface TablaPaginadaProps<T> {
  datos: T[]; 
  columnas: ColumnsType<T>;
  total: number;
  paginaActual: number; 
  tamanioPagina: number;
  onPageChange: (pagina: number, tamanioPagina: number) => void; 
  opcionesTamanioPagina?: string[]; 
  claveFila: string | ((registro: T) => string | number);
  acciones?: (registro: T) => React.ReactNode;
}

const TablaPaginada = <T extends object>({
  datos,
  columnas,
  total,
  paginaActual,
  tamanioPagina,
  onPageChange,
  opcionesTamanioPagina = ['5', '10', '20'],
  claveFila,
  acciones,
}: TablaPaginadaProps<T>) => {

  const manejarCambio = (paginacion: TablePaginationConfig) => {
    const nuevaPagina = paginacion.current || 1;
    const nuevoTamanio = paginacion.pageSize || tamanioPagina;
    onPageChange(nuevaPagina, nuevoTamanio);
  };

  const columnasFinales = acciones
    ? [
        ...columnas,
        {
          title: "Acciones",
          key: "acciones",
          render: (_: any, registro: T) => acciones(registro),
          align: "center" as const,
        },
      ]
    : columnas;

  return (
    <div className="rounded-xl shadow bg-white p-2">
      <Table
        columns={columnasFinales}
        dataSource={datos}
        rowKey={claveFila}
        size="middle"
        tableLayout="fixed"
        bordered
        className="!rounded-xl !overflow-hidden
          [&_.ant-table-thead>tr>th]:bg-slate-100
          [&_.ant-table-thead>tr>th]:text-slate-700
          [&_.ant-table-thead>tr>th]:font-semibold
          [&_.ant-table-tbody>tr:hover>td]:bg-slate-50
          [&_.ant-table-tbody>tr>td]:align-middle
          "
        pagination={{
          current: paginaActual,
          pageSize: tamanioPagina,
          total,
          showSizeChanger: true,
          pageSizeOptions: opcionesTamanioPagina,
          showTotal: (total, rango) => `${rango[0]}-${rango[1]} de ${total} registros`,
          locale: {
            items_per_page: 'por página',
            jump_to: 'Ir a',
            jump_to_confirm: 'Confirmar',
            page: '',
          },
        }}
        onChange={manejarCambio}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};

export default TablaPaginada;
