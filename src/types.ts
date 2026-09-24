export type TipoVivienda = 'CASA' | 'PISO';
export type BuhardillaOption = 'Buhardilla inhabitable' | 'Buhardilla habitable' | 'Sí, tengo buhardilla.' | 'No, no tengo';
export type TipoOcupante = 'PROPIETARIO' | 'INQUILINO';
export type TipoCalefaccion = 'ELÉCTRICA' | 'GAS' | 'GASÓLEO' | 'OTRO';

export interface FormDataState {
  tipoVivienda: TipoVivienda | null;
  buhardilla: BuhardillaOption | null;
  tipoOcupante: TipoOcupante | null;
  tipoCalefaccion: TipoCalefaccion | null;
  codigoPostal: string;
  apellidos: string;
  nombre: string;
  email: string;
  telefono: string;
  consentimiento: boolean;
}

export interface StoredLead extends FormDataState {
  id: string;
  createdAt: string;
  formattedDate: string;
  deviceType: 'desktop' | 'mobile';
  submissionStatus: 'enviado_google_form' | 'guardado_local';
}

export interface GoogleFormConfig {
  actionUrl: string;
  entries: {
    tipoVivienda: string;
    buhardilla: string;
    tipoOcupante: string;
    tipoCalefaccion: string;
    codigoPostal: string;
    apellidos: string;
    nombre: string;
    email: string;
    telefono: string;
  };
}
