import React from "react";
import KPICard from "../../components/Charts/KPICards";
import {
  GraficoArea,
  GraficoBarras,
  GraficoLineas,
  GraficoPastel,
  GraficoRadar,
} from "../../components/Charts";
import { Contenedor } from "../../components/UI/Contenedor";
import Tarjeta from "../../components/UI/Tarjeta";

const Graficas: React.FC = () => {
  const dataBarras = [
    { name: "Ene", value: 30 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 60 },
  ];

  const dataPastel = [
    { name: "Ventas", value: 40 },
    { name: "Marketing", value: 30 },
    { name: "Operaciones", value: 30 },
  ];

  const dataArea = [
    { name: "Semana 1", "Product One": 40, "Product Two": 30 },
    { name: "Semana 2", "Product One": 70, "Product Two": 50 },
    { name: "Semana 3", "Product One": 60, "Product Two": 80 },
  ];

  const dataLineas = [
    { index: "Ene", ventas: 50, gastos: 30 },
    { index: "Feb", ventas: 80, gastos: 50 },
    { index: "Mar", ventas: 65, gastos: 45 },
  ];

  const linesLineas = [
    { key: "ventas", color: "#3C50E0", name: "Ventas" },
    { key: "gastos", color: "#80CAEE", name: "Gastos" },
  ];

  const dataRadar = [
    { metric: "Calidad", value: 85 },
    { metric: "Velocidad", value: 65 },
    { metric: "Precio", value: 70 },
    { metric: "Soporte", value: 90 },
    { metric: "Usabilidad", value: 75 },
  ];

  return (
    <Contenedor>
      <Tarjeta
        titulo="Indicadores Clave de Rendimiento"
        subtitulo="Estos son algunos de los indicadores clave de rendimiento que estamos monitoreando actualmente."
        lineaHeader={{
          color: "blue",
          grosor: "2px",
          mostrar: true,
        }}
      >
        <div className="mb-6 flex flex-wrap gap-4">
          <KPICard
            titulo="Ventas Totales"
            valor={15000}
            unit="USD"
            variante="primary"
          />
          <KPICard titulo="Usuarios Activos" valor={1200} variante="info" />
          <KPICard
            titulo="Conversión"
            valor={4.5}
            unit="%"
            variante="success"
          />
          <KPICard
            titulo="Conversión"
            valor={4.5}
            unit="%"
            variante="warning"
          />
          <KPICard
            titulo="Tasa de Retención"
            valor={85}
            unit="%"
            variante="dark"
          />
        </div>
      </Tarjeta>
      {/* Gráficos */}

    
        {/* Gráfico de Barras */}
        <Tarjeta
          titulo="Gráfico de Barras"
          subtitulo="Este gráfico muestra las ventas mensuales en los primeros tres meses del año."
          lineaHeader={{
            color: "blue",
            grosor: "2px",
            mostrar: true,
          }}
          tamano={6}
        >
          <div className="rounded-xl border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-lg font-semibold text-black dark:text-white mb-4"></h4>
            <GraficoBarras
              data={dataBarras}
              colors={["#3C50E0", "#80CAEE", "#FAA2C1"]}
            />
          </div>
        </Tarjeta>
        {/* Gráfico de Área */}
        <Tarjeta
          titulo="Gráfico de Área"
          subtitulo="Este gráfico muestra la evolución de las ventas y gastos a lo largo de tres semanas."
          lineaHeader={{
            color: "blue",
            grosor: "2px",
            mostrar: true,
          }}
          tamano={6}
        >
          <div className="rounded-xl border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <GraficoArea data={dataArea} />
          </div>
        </Tarjeta>
        {/* Gráfico de Líneas */}
        <Tarjeta
          titulo="Gráfico de Líneas"
          subtitulo="Este gráfico muestra la evolución de las ventas y gastos a lo largo de tres meses."
          lineaHeader={{
            color: "blue",
            grosor: "2px",
            mostrar: true,
          }}
          tamano={6}
        >
          <div className="rounded-xl border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-lg font-semibold text-black dark:text-white mb-4">
              Gráfico de Líneas
            </h4>
            <GraficoLineas data={dataLineas} lines={linesLineas} />
          </div>
        </Tarjeta>

        <Tarjeta
          titulo="Gráfico de radar"
          subtitulo="Este gráfico muestra la evaluación de diferentes métricas de rendimiento."
          lineaHeader={{
            color: "blue",
            grosor: "2px",
            mostrar: true,
          }}
          tamano={6}
        >
          <div className="rounded-xl border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <GraficoRadar data={dataRadar} color="#3C50E0" />
          </div>
        </Tarjeta>

        <Tarjeta
          titulo="Gráfico de Pastel"
          subtitulo="Este gráfico muestra la distribución de los gastos en diferentes áreas."
          lineaHeader={{
            color: "blue",
            grosor: "2px",
            mostrar: true,
          }}
          tamano={6}
        >
          <div className="rounded-xl border border-stroke bg-white p-4 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <GraficoPastel
              data={dataPastel}
              colors={["#3C50E0", "#80CAEE", "#FFB347"]}
            />
          </div>
        </Tarjeta>
    </Contenedor>
  );
};

export default Graficas;
