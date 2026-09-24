import { APP_CONFIG } from '../config';
import { FormDataState, StoredLead } from '../types';

const LEADS_STORAGE_KEY = 'enerova_leads_database';

/**
 * Guarda el lead en almacenamiento local como respaldo seguro
 */
export function saveLeadLocally(data: FormDataState): StoredLead {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const now = new Date();

  const newLead: StoredLead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: now.toISOString(),
    formattedDate: now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    deviceType: isMobile ? 'mobile' : 'desktop',
    submissionStatus: 'enviado_google_form',
  };

  try {
    const existing = getStoredLeads();
    const updated = [newLead, ...existing];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('No se pudo persistir en localStorage:', e);
  }

  return newLead;
}

/**
 * Obtiene todos los leads guardados
 */
export function getStoredLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Envía los datos capturados de forma interna e invisible a Google Form
 * y al respaldo local.
 */
export async function submitLeadToGoogleForm(
  data: FormDataState,
  customConfig = APP_CONFIG.googleForm
): Promise<{ success: boolean; lead: StoredLead }> {
  // 1. Guardar de inmediato en la base de datos local
  const lead = saveLeadLocally(data);

  // 2. Preparar los parámetros con los entry IDs de Google Form
  const entries = customConfig.entries;
  const params = new URLSearchParams();

  if (entries.tipoVivienda && data.tipoVivienda) {
    params.append(entries.tipoVivienda, data.tipoVivienda);
  }
  if (entries.buhardilla && data.buhardilla) {
    params.append(entries.buhardilla, data.buhardilla);
  }
  if (entries.tipoOcupante && data.tipoOcupante) {
    params.append(entries.tipoOcupante, data.tipoOcupante);
  }
  if (entries.tipoCalefaccion && data.tipoCalefaccion) {
    params.append(entries.tipoCalefaccion, data.tipoCalefaccion);
  }
  if (entries.codigoPostal && data.codigoPostal) {
    params.append(entries.codigoPostal, data.codigoPostal);
  }
  if (entries.apellidos && data.apellidos) {
    params.append(entries.apellidos, data.apellidos);
  }
  if (entries.nombre && data.nombre) {
    params.append(entries.nombre, data.nombre);
  }
  if (entries.email && data.email) {
    params.append(entries.email, data.email);
  }
  if (entries.telefono && data.telefono) {
    params.append(entries.telefono, data.telefono);
  }

  // 3. Envío a Google Form (único envío para evitar duplicados)
  try {
    if (customConfig.actionUrl && customConfig.actionUrl.includes('google.com')) {
      await fetch(customConfig.actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
    }
  } catch (error) {
    console.warn('Fallo en fetch no-cors, ejecutando método de respaldo vía iframe:', error);
    try {
      submitViaHiddenIframe(customConfig.actionUrl, params);
    } catch (err) {
      console.error('Error en método de respaldo:', err);
    }
  }

  return { success: true, lead };
}

/**
 * Método de respaldo mediante un iframe invisible que garantiza
 * el envío a Google Docs sin redirección ni intervención del usuario.
 */
function submitViaHiddenIframe(actionUrl: string, params: URLSearchParams) {
  if (typeof document === 'undefined') return;

  const iframeId = 'gform_silent_target';
  let iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;

  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = iframeId;
    iframe.name = iframeId;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  const form = document.createElement('form');
  form.target = iframeId;
  form.action = actionUrl;
  form.method = 'POST';
  form.style.display = 'none';

  params.forEach((value, key) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  // Limpiar el elemento del DOM tras envío
  setTimeout(() => {
    form.remove();
  }, 2500);
}
