import React, { useState, useEffect } from 'react';
import { Debug, DebugLevel, DebugEntry } from '../../utils/debugSystem';

interface DebugPanelProps {
    mostrar?: boolean;
    maxLogs?: number;
    categories?: string[];
    levels?: DebugLevel[];
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ 
    mostrar = true, 
    maxLogs = 50,
    categories,
    levels
}) => {
    const [logs, setLogs] = useState<DebugEntry[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [filtroCategoria, setFiltroCategoria] = useState<string>('');
    const [filtroNivel, setFiltroNivel] = useState<DebugLevel | ''>('');

    // 🔄 Actualizar logs cada segundo
    useEffect(() => {
        if (!mostrar) return;

        const interval = setInterval(() => {
            const newLogs = Debug.getLastLogs(maxLogs);
            setLogs(newLogs);
        }, 1000);

        return () => clearInterval(interval);
    }, [mostrar, maxLogs]);

    // 🎯 Filtrar logs
    const logsFiltrados = logs.filter(log => {
        const matchCategoria = !filtroCategoria || log.category.includes(filtroCategoria.toUpperCase());
        const matchNivel = !filtroNivel || log.level === filtroNivel;
        const matchCategorias = !categories || categories.includes(log.category);
        const matchNiveles = !levels || levels.includes(log.level);
        
        return matchCategoria && matchNivel && matchCategorias && matchNiveles;
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

    if (!mostrar) return null;

    const stats = Debug.getStats();
    const categoriesAvailable = stats.categories;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* 🎯 Botón toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
                🔍 Debug ({logs.length})
            </button>

            {/* 📋 Panel principal */}
            {isExpanded && (
                <div className="w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
                    {/* 🎛️ Header con controles */}
                    <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">Debug Panel</h3>
                            <div className="text-xs text-gray-500">
                                Total: {stats.total} | Errores: {stats.byLevel[DebugLevel.ERROR] || 0}
                            </div>
                        </div>
                        
                        {/* 🔍 Filtros */}
                        <div className="flex gap-2 text-xs">
                            <select 
                                value={filtroCategoria} 
                                onChange={(e) => setFiltroCategoria(e.target.value)}
                                className="px-2 py-1 border border-gray-200 rounded text-xs"
                            >
                                <option value="">Todas las categorías</option>
                                {categoriesAvailable.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            
                            <select 
                                value={filtroNivel} 
                                onChange={(e) => setFiltroNivel(e.target.value as DebugLevel)}
                                className="px-2 py-1 border border-gray-200 rounded text-xs"
                            >
                                <option value="">Todos los niveles</option>
                                {Object.values(DebugLevel).map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                            
                            <button
                                onClick={() => Debug.clearLogs()}
                                className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs hover:bg-red-200"
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>

                    {/* 📝 Lista de logs */}
                    <div className="flex-1 overflow-y-auto p-2">
                        {logsFiltrados.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">
                                No hay logs que mostrar
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {logsFiltrados.map((log, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded border text-xs ${getColorByLevel(log.level)}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-mono font-semibold">
                                                {getEmojiByLevel(log.level)} {log.category}
                                            </span>
                                            <span className="text-xs opacity-75">
                                                {new Date(log.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="mb-1">{log.message}</div>
                                        {log.data && (
                                            <details className="mt-1">
                                                <summary className="cursor-pointer text-xs opacity-75 hover:opacity-100">
                                                    Ver datos
                                                </summary>
                                                <pre className="mt-1 p-1 bg-black/5 rounded text-xs overflow-x-auto">
                                                    {JSON.stringify(log.data, null, 2)}
                                                </pre>
                                            </details>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}; 