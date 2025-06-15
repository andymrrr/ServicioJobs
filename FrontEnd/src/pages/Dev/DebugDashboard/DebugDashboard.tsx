import React, { useState, useEffect } from 'react';
import { Debug, DebugLevel, DebugEntry } from '../../../utils/debugSystem';
import { Contenedor } from '../../../components/UI/Contenedor';
import Tarjeta from '../../../components/UI/Tarjeta';
import { useDebugTestData } from '../../../hooks/Dev/useDebugTestData';

export const DebugDashboard = () => {
    const [logs, setLogs] = useState<DebugEntry[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState<string>('');
    const [filtroNivel, setFiltroNivel] = useState<DebugLevel | ''>('');
    const [filtroTexto, setFiltroTexto] = useState<string>('');
    const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
    const [selectedLog, setSelectedLog] = useState<DebugEntry | null>(null);

    // 🧪 Hook para datos de prueba
    const { generateTestLogs, generateTestErrors, generateSuccessLogs, simulateFormFlow } = useDebugTestData();

    // 🔄 Actualizar logs
    useEffect(() => {
        const updateLogs = () => {
            const allLogs = Debug.getLogs();
            setLogs(allLogs);
        };

        updateLogs();

        if (autoRefresh) {
            const interval = setInterval(updateLogs, 2000);
            return () => clearInterval(interval);
        }
    }, [autoRefresh]);

    // 📊 Estadísticas
    const stats = Debug.getStats();
    const logsFiltrados = logs.filter(log => {
        const matchCategoria = !filtroCategoria || log.category.includes(filtroCategoria.toUpperCase());
        const matchNivel = !filtroNivel || log.level === filtroNivel;
        const matchTexto = !filtroTexto || 
            log.message.toLowerCase().includes(filtroTexto.toLowerCase()) ||
            log.category.toLowerCase().includes(filtroTexto.toLowerCase());
        
        return matchCategoria && matchNivel && matchTexto;
    });

    // 🎨 Obtener color por nivel
    const getColorByLevel = (level: DebugLevel) => {
        const colors = {
            [DebugLevel.INFO]: 'text-blue-600 bg-blue-50 border-blue-200',
            [DebugLevel.WARNING]: 'text-orange-600 bg-orange-50 border-orange-200',
            [DebugLevel.ERROR]: 'text-red-600 bg-red-50 border-red-200',
            [DebugLevel.SUCCESS]: 'text-green-600 bg-green-50 border-green-200'
        };
        return colors[level] || 'text-gray-600 bg-gray-50 border-gray-200';
    };

    // 🎭 Obtener emoji por nivel
    const getEmojiByLevel = (level: DebugLevel) => {
        const emojis = {
            [DebugLevel.INFO]: '🔍',
            [DebugLevel.WARNING]: '⚠️',
            [DebugLevel.ERROR]: '❌',
            [DebugLevel.SUCCESS]: '✅'
        };
        return emojis[level] || '📝';
    };

    // 📤 Exportar logs
    const handleExportLogs = () => {
        const dataStr = Debug.exportLogs();
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `debug-logs-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // 🧹 Limpiar logs
    const handleClearLogs = () => {
        if (window.confirm('¿Estás seguro de que quieres limpiar todos los logs?')) {
            Debug.clearLogs();
            setLogs([]);
            setSelectedLog(null);
        }
    };

    return (
        <Contenedor>
            {/* 📊 Header con estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Tarjeta titulo="Total Logs" tamano={4}>
                    <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                </Tarjeta>
                
                <Tarjeta titulo="Errores" tamano={4}>
                    <div className="text-3xl font-bold text-red-600">
                        {stats.byLevel[DebugLevel.ERROR] || 0}
                    </div>
                </Tarjeta>
                
                <Tarjeta titulo="Warnings" tamano={4}>
                    <div className="text-3xl font-bold text-orange-600">
                        {stats.byLevel[DebugLevel.WARNING] || 0}
                    </div>
                </Tarjeta>
                
                <Tarjeta titulo="Categorías" tamano={4}>
                    <div className="text-3xl font-bold text-green-600">
                        {stats.categories.length}
                    </div>
                </Tarjeta>
            </div>

            {/* 🎛️ Panel de controles */}
            <div className="mb-6">
                <Tarjeta titulo="Controles de Debug" tamano={12}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Filtro por categoría */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría
                            </label>
                            <select 
                                value={filtroCategoria} 
                                onChange={(e) => setFiltroCategoria(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todas las categorías</option>
                                {stats.categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Filtro por nivel */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nivel
                            </label>
                            <select 
                                value={filtroNivel} 
                                onChange={(e) => setFiltroNivel(e.target.value as DebugLevel)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todos los niveles</option>
                                {Object.values(DebugLevel).map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Filtro por texto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Buscar
                            </label>
                            <input
                                type="text"
                                value={filtroTexto}
                                onChange={(e) => setFiltroTexto(e.target.value)}
                                placeholder="Buscar en logs..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Auto refresh */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Auto Refresh
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={autoRefresh}
                                    onChange={(e) => setAutoRefresh(e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm">Actualizar automáticamente</span>
                            </label>
                        </div>
                    </div>
                    
                    {/* Botones de acción principales */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <button
                            onClick={handleExportLogs}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            📤 Exportar Logs
                        </button>
                        
                        <button
                            onClick={handleClearLogs}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            🧹 Limpiar Logs
                        </button>
                        
                        <button
                            onClick={() => setLogs(Debug.getLogs())}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            🔄 Actualizar
                        </button>
                    </div>

                    {/* 🧪 Botones de prueba */}
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">🧪 Generar Datos de Prueba:</h4>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={generateTestLogs}
                                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                            >
                                🎲 Logs Aleatorios
                            </button>
                            
                            <button
                                onClick={generateTestErrors}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                            >
                                🔥 Errores de Prueba
                            </button>
                            
                            <button
                                onClick={generateSuccessLogs}
                                className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                            >
                                ✅ Logs de Éxito
                            </button>
                            
                            <button
                                onClick={simulateFormFlow}
                                className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600 transition-colors"
                            >
                                🔄 Simular Flujo
                            </button>
                        </div>
                    </div>
                </Tarjeta>
            </div>

            {/* 📋 Lista de logs y detalle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lista de logs */}
                <div>
                    <Tarjeta titulo={`Logs (${logsFiltrados.length})`} tamano={6}>
                        <div className="h-96 overflow-y-auto">
                            {logsFiltrados.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">
                                    No hay logs que mostrar
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {logsFiltrados.map((log, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedLog(log)}
                                            className={`p-3 rounded border cursor-pointer transition-all hover:shadow-md ${
                                                getColorByLevel(log.level)
                                            } ${selectedLog === log ? 'ring-2 ring-blue-500' : ''}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-mono font-semibold text-sm">
                                                    {getEmojiByLevel(log.level)} {log.category}
                                                </span>
                                                <span className="text-xs opacity-75">
                                                    {new Date(log.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="text-sm truncate">{log.message}</div>
                                            {log.data && (
                                                <div className="text-xs opacity-75 mt-1">
                                                    📦 Contiene datos adicionales
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Tarjeta>
                </div>

                {/* Detalle del log seleccionado */}
                <div>
                    <Tarjeta titulo="Detalle del Log" tamano={6}>
                        <div className="h-96 overflow-y-auto">
                            {selectedLog ? (
                                <div className="space-y-4">
                                    {/* Header del log */}
                                    <div className={`p-3 rounded border ${getColorByLevel(selectedLog.level)}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono font-bold">
                                                {getEmojiByLevel(selectedLog.level)} {selectedLog.level}
                                            </span>
                                            <span className="text-sm">
                                                {new Date(selectedLog.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="font-semibold">{selectedLog.category}</div>
                                        <div className="mt-2">{selectedLog.message}</div>
                                    </div>

                                    {/* Datos adicionales */}
                                    {selectedLog.data && (
                                        <div>
                                            <h4 className="font-semibold mb-2">📦 Datos:</h4>
                                            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                {JSON.stringify(selectedLog.data, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Stack trace */}
                                    {selectedLog.trace && (
                                        <div>
                                            <h4 className="font-semibold mb-2">📍 Stack Trace:</h4>
                                            <pre className="bg-red-50 p-3 rounded text-xs overflow-x-auto text-red-800">
                                                {selectedLog.trace}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 py-8">
                                    Selecciona un log para ver los detalles
                                </div>
                            )}
                        </div>
                    </Tarjeta>
                </div>
            </div>

            {/* 📈 Gráfico de distribución por nivel */}
            <div className="mt-6">
                <Tarjeta titulo="Distribución por Nivel" tamano={12}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.values(DebugLevel).map(level => {
                            const count = stats.byLevel[level] || 0;
                            const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                            
                            return (
                                <div key={level} className="text-center">
                                    <div className={`p-4 rounded-lg ${getColorByLevel(level)}`}>
                                        <div className="text-2xl font-bold">{count}</div>
                                        <div className="text-sm">{level}</div>
                                        <div className="text-xs opacity-75">{percentage.toFixed(1)}%</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Tarjeta>
            </div>
        </Contenedor>
    );
}; 