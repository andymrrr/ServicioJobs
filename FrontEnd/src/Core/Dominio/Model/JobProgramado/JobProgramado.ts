export interface JobProgramado {
    idProgramado: string;
    idMetodo: string;
    nombre: string;
    descripcion: string;
    url: string;
    crontab: string;
    correoNotificar: string;
    fechaEjecucion: string;
    fechaReintento: string | null;
    ultimaEjecucion: string | null;
    timeout: number;
    estadoEjecucion: number;
    ultimaEjecucionExitosa: string | null;
    reintentosPermitidos: number;
    periodoReintento: number;
    reintentos: number;
    habilitado: boolean;
    metodoHttp: number;
  }
  