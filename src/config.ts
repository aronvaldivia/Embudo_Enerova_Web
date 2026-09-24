import { GoogleFormConfig } from './types';

/**
 * =========================================================================
 * ARCHIVO DE CONFIGURACIÓN PRINCIPAL - ENEROVA AISLAMIENTO TÉRMICO
 * =========================================================================
 * Puedes cambiar fácilmente las URLs de videos, logo y Google Form aquí.
 */

export const APP_CONFIG = {
  // INFORMACIÓN CORPORATIVA
  brandName: 'ENEROVA',
  brandTagline: 'Aislamiento Térmico Eficiente',
  adminEmail: 'enerova.admin@gmail.com',
  supportPhone: '637 757 769',
  supportHours: 'Lun a Vie: 9:00 - 19:00',

  // 1. LOGO EN EL HEADER (Cambia esta URL para usar tu propio logo)
  headerLogoUrl: 'https://mcusercontent.com/17635adc15e4488859eb5650d/images/a2016c29-d0b2-2295-35af-ff259f559b3c.png',

  // 2. VIDEO DE FONDO PARA VISTA PC / ESCRITORIO
  // Video en loop de alta calidad para pantallas grandes (formato MP4)
  desktopVideoUrl: 'https://mcusercontent.com/17635adc15e4488859eb5650d/files/1916d153-713c-8db6-be99-1a8ae7b324c3/VIDEO_FONDO_BUARDILLA.mp4',

  // 3. VIDEO DE FONDO PARA VISTA MÓVIL / CELULAR
  // Video vertical / optimizado para pantallas de smartphone
  mobileVideoUrl: 'https://mcusercontent.com/17635adc15e4488859eb5650d/files/927a1af6-c8e3-7272-a135-876d3e4a8796/VIDEO_FONDO_CELL_ENEROVA.mp4',

  // 4. IMAGEN DE RESPALDO (POSTER) EN CASO DE CONEXIÓN LENTA
  fallbackPosterUrl: '',

  // 5. IMÁGENES PARA PREGUNTA 2: ¿QUÉ TIPO DE BUHARDILLA TIENES?
  // Puedes cambiar estas URLs por las tuyas en cualquier momento
  buhardillaInhabitableImg: 'https://mcusercontent.com/17635adc15e4488859eb5650d/images/3012c3f2-c9b5-98c9-1c1b-5f1d84359ad9.jpeg',
  buhardillaHabitableImg: 'https://mcusercontent.com/17635adc15e4488859eb5650d/images/12da9565-5927-ccf5-3f76-590b521fa322.jpeg',

  // 6. CONFIGURACIÓN DE GOOGLE FORM VINCULADO A: FORMULARIO DE CLIENTES WEB
  googleForm: {
    actionUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScngGbIGMZ-sRkTSnlBqVyqEsaHNmuAkd6i-LxjioMCZy9YYQ/formResponse',
    entries: {
      tipoVivienda: 'entry.2005620554',
      buhardilla: 'entry.847095191',
      tipoOcupante: 'entry.440078393',
      tipoCalefaccion: 'entry.291668061',
      codigoPostal: 'entry.1610189404',
      nombre: 'entry.296927702',
      apellidos: 'entry.1666539659',
      email: 'entry.457798640',
      telefono: 'entry.1757777231',
    },
  } as GoogleFormConfig,
};
