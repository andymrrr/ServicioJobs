import { 
  Api, 
  ApiConArchivo, 
  ApiSinAuth, 
  configurarTokens, 
  limpiarTokens, 
  estaAutenticado,
  crearApiPersonalizada,
  TokenManager
} from '../configuracion/Api';

// ============================================
// 📋 EJEMPLOS DE USO DE LA API MEJORADA
// ============================================

// 1. 🔐 LOGIN Y CONFIGURACIÓN DE TOKENS
export const ejemploLogin = async (email: string, password: string) => {
  try {
    // Usar API sin autenticación para login
    const response = await ApiSinAuth.post('/auth/login', {
      email,
      password
    });

    const { access_token, refresh_token, user } = response.data;

    // Configurar tokens automáticamente
    configurarTokens(access_token, refresh_token);

    console.log('✅ Login exitoso:', user);
    return { success: true, user };
  } catch (error: any) {
    console.error('❌ Error en login:', error.message);
    return { success: false, error: error.message };
  }
};

// 2. 📊 SOLICITUD CON TOKEN AUTOMÁTICO
export const obtenerDashboard = async () => {
  try {
    // El token se agregará automáticamente
    const response = await Api.get('/dashboard');
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener dashboard:', error.message);
    throw error;
  }
};

// 3. 📁 SUBIR ARCHIVO CON TOKEN
export const subirArchivo = async (archivo: File, descripcion?: string) => {
  try {
    const formData = new FormData();
    formData.append('archivo', archivo);
    if (descripcion) {
      formData.append('descripcion', descripcion);
    }

    // Usar ApiConArchivo para multipart/form-data
    const response = await ApiConArchivo.post('/archivos/subir', formData);
    
    console.log('✅ Archivo subido:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al subir archivo:', error.message);
    throw error;
  }
};

// 4. 🔓 LOGOUT
export const logout = async () => {
  try {
    // Notificar al servidor (opcional)
    await Api.post('/auth/logout');
  } catch (error) {
    console.warn('⚠️ Error al hacer logout en servidor:', error);
  } finally {
    // Limpiar tokens locales
    limpiarTokens();
    
    // Opcional: redirigir al login
    window.location.href = '/login';
  }
};

// 5. ⚙️ API PERSONALIZADA
export const apiPersonalizadaEjemplo = () => {
  // Crear una instancia personalizada con timeout mayor
  const ApiLenta = crearApiPersonalizada({
    contentType: "application/json",
    withAuth: true,
    timeout: 30000 // 30 segundos
  });

  return ApiLenta;
};

// 6. 🔍 VERIFICAR AUTENTICACIÓN
export const verificarEstadoAuth = () => {
  const autenticado = estaAutenticado();
  const token = TokenManager.getToken();
  
  console.log('🔐 Estado de autenticación:', {
    autenticado,
    tieneToken: !!token,
    token: token ? `${token.substring(0, 20)}...` : null
  });

  return autenticado;
};

// 7. 🔄 MANEJAR EVENTO DE LOGOUT AUTOMÁTICO
export const configurarEventoLogout = () => {
  window.addEventListener('auth:logout', () => {
    console.log('🚪 Sesión expirada, redirigiendo al login...');
    
    // Limpiar estado de la aplicación
    // Ej: limpiar Redux store, localStorage, etc.
    
    // Redirigir al login
    window.location.href = '/login';
  });
};

// 8. 📋 SOLICITUD PAGINADA CON PARÁMETROS
export const obtenerUsuariosPaginado = async (pagina: number = 1, limite: number = 10) => {
  try {
    const response = await Api.get('/usuarios', {
      params: {
        page: pagina,
        limit: limite
      }
    });

    return {
      usuarios: response.data.data,
      total: response.data.total,
      paginaActual: response.data.current_page,
      totalPaginas: response.data.total_pages
    };
  } catch (error: any) {
    console.error('❌ Error al obtener usuarios:', error.message);
    throw error;
  }
};

// 9. ✍️ CREAR/ACTUALIZAR CON DATOS COMPLEJOS
export const crearUsuario = async (datosUsuario: {
  nombre: string;
  email: string;
  rol: string;
  perfil?: any;
}) => {
  try {
    const response = await Api.post('/usuarios', datosUsuario);
    
    console.log('✅ Usuario creado:', response.data);
    return response.data;
  } catch (error: any) {
    // El error ya viene formateado por el interceptor
    console.error('❌ Error al crear usuario:', error.message);
    
    // Manejar errores específicos
    if (error.status === 422) {
      console.error('📝 Errores de validación:', error.data?.errors);
    }
    
    throw error;
  }
};

// 10. 🔄 EJEMPLO DE USO CON ASYNC/AWAIT Y LOADING
export const ejemploConLoading = async () => {
  let loading = true;
  
  try {
    console.log('⏳ Cargando datos...');
    
    const [dashboard, usuarios] = await Promise.all([
      obtenerDashboard(),
      obtenerUsuariosPaginado(1, 5)
    ]);

    console.log('✅ Datos cargados:', { dashboard, usuarios });
    return { dashboard, usuarios };
    
  } catch (error: any) {
    console.error('❌ Error al cargar datos:', error.message);
    throw error;
  } finally {
    loading = false;
    console.log('⏹️ Carga finalizada');
  }
};

// =====================================
// 🎯 CONSEJOS DE USO
// =====================================

/*
📝 NOTAS IMPORTANTES:

1. 🔐 AUTENTICACIÓN AUTOMÁTICA:
   - Las instancias Api y ApiConArchivo agregan automáticamente el Bearer Token
   - Usa ApiSinAuth para endpoints públicos (login, registro, etc.)

2. 🔄 REFRESH TOKEN AUTOMÁTICO:
   - Si el token expira (401), se intenta renovar automáticamente
   - Si falla, se dispara el evento 'auth:logout'

3. 📊 LOGGING AUTOMÁTICO:
   - En desarrollo se muestran logs de requests/responses
   - En producción se desactivan automáticamente

4. ⚡ TIMEOUT CONFIGURABLE:
   - Timeout por defecto: 10 segundos
   - Personalizable por instancia

5. 🎯 MANEJO DE ERRORES:
   - Errores formateados consistentemente
   - Información de status y datos disponibles

6. 💾 ALMACENAMIENTO SEGURO:
   - Tokens en localStorage
   - Verificación automática de expiración JWT

EJEMPLO DE INICIALIZACIÓN EN TU APP:

// En tu componente principal o App.tsx
useEffect(() => {
  configurarEventoLogout();
  
  // Verificar si hay token válido al iniciar
  if (estaAutenticado()) {
    console.log('✅ Usuario ya autenticado');
    // Cargar datos iniciales
  } else {
    console.log('🔓 Usuario no autenticado');
    // Redirigir al login si es necesario
  }
}, []);

*/ 