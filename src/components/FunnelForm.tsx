import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Building2,
  KeyRound,
  UserCheck,
  Zap,
  Flame,
  Fuel,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Warehouse,
  Ban,
  Lock,
} from 'lucide-react';
import {
  FormDataState,
  TipoVivienda,
  TipoOcupante,
  TipoCalefaccion,
  BuhardillaOption,
  StoredLead,
} from '../types';
import { submitLeadToGoogleForm } from '../services/formSubmission';
import { APP_CONFIG } from '../config';

interface FunnelFormProps {
  onSuccessSubmission?: (lead: StoredLead) => void;
}

const INITIAL_FORM: FormDataState = {
  tipoVivienda: null,
  buhardilla: null,
  tipoOcupante: null,
  tipoCalefaccion: null,
  codigoPostal: '',
  apellidos: '',
  nombre: '',
  email: '',
  telefono: '',
  consentimiento: true,
};

export default function FunnelForm({ onSuccessSubmission }: FunnelFormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<StoredLead | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 6 pasos en total
  const totalSteps = 6;
  const progressPercent = Math.min(100, Math.round((step / totalSteps) * 100));

  // Paso 1: Selección de Vivienda y avance automático a Paso 2 (Buhardilla)
  const handleSelectVivienda = (tipo: TipoVivienda) => {
    setFormData((prev) => ({ ...prev, tipoVivienda: tipo }));
    setTimeout(() => {
      setStep(2);
    }, 200);
  };

  // Paso 2: ¿Cuentas con buhardilla? y avance automático a Paso 3 (Ocupante)
  const handleSelectBuhardilla = (opcion: BuhardillaOption) => {
    setFormData((prev) => ({ ...prev, buhardilla: opcion }));
    setTimeout(() => {
      setStep(3);
    }, 200);
  };

  // Paso 3: Selección de Ocupante y avance automático a Paso 4 (Calefacción)
  const handleSelectOcupante = (tipo: TipoOcupante) => {
    setFormData((prev) => ({ ...prev, tipoOcupante: tipo }));
    setTimeout(() => {
      setStep(4);
    }, 200);
  };

  // Paso 4: Selección de Calefacción y avance automático a Paso 5 (Código Postal)
  const handleSelectCalefaccion = (tipo: TipoCalefaccion) => {
    setFormData((prev) => ({ ...prev, tipoCalefaccion: tipo }));
    setTimeout(() => {
      setStep(5);
    }, 200);
  };

  // Paso 5: Manejo de Código Postal (5 dígitos)
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData((prev) => ({ ...prev, codigoPostal: rawVal }));
    if (errors.codigoPostal) {
      setErrors((prev) => ({ ...prev, codigoPostal: '' }));
    }
  };

  const handlePostalCodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (formData.codigoPostal.length === 5) {
      setStep(6);
    } else {
      setErrors((prev) => ({
        ...prev,
        codigoPostal: 'Por favor, introduzca los 5 dígitos de su código postal.',
      }));
    }
  };

  // Paso 6: Manejo de Contacto y Envío Final
  const handleContactChange = (field: keyof FormDataState, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Introduzca un correo electrónico válido';
    }

    const phoneDigits = formData.telefono.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      newErrors.telefono = 'Introduzca un teléfono válido (mínimo 8-9 dígitos)';
    }

    if (!formData.consentimiento) {
      newErrors.consentimiento = 'Debe aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateContactForm()) return;

    setIsSubmitting(true);
    try {
      const response = await submitLeadToGoogleForm(formData);
      setSubmittedLead(response.lead);
      if (onSuccessSubmission) {
        onSuccessSubmission(response.lead);
      }
      setStep(7); // Pantalla de éxito
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setStep(7);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setSubmittedLead(null);
    setErrors({});
    setStep(1);
  };

  return (
    <div
      id="funnel-container"
      className="w-full max-w-xl mx-auto bg-white rounded-[12px] shadow-2xl border border-slate-100 overflow-hidden relative"
    >
      {/* Encabezado Superior */}
      <div className="bg-gradient-to-r from-[#024327] to-[#035933] px-5 py-3.5 text-center text-white relative">
        <h2 className="text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm font-['Outfit'] flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-[#76b72f]" />
          ENVIA TU SOLICITUD COMPLETAMENTE GRATIS!
        </h2>
        <p className="text-[11px] sm:text-xs text-emerald-100/90 mt-0.5">
          Una de nuestras asesoras se pondrá en contacto contigo.
        </p>
      </div>

      {/* Barra de Progreso Activa en Verde Claro #76b72f (Oculta en pantalla de éxito) */}
      {step <= totalSteps && (
        <div className="px-6 pt-5 pb-2 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5 text-[#024327]">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  className="p-1 -ml-1 text-slate-500 hover:text-[#024327] transition flex items-center gap-0.5 text-xs font-semibold"
                  title="Volver al paso anterior"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Atrás</span>
                </button>
              )}
              <span>Paso {step} de {totalSteps}</span>
            </span>
            <span className="text-[#024327] font-extrabold bg-[#76b72f]/15 px-2 py-0.5 rounded-full text-[11px]">
              {progressPercent}% completado
            </span>
          </div>

          {/* Barra Track y Relleno #76b72f */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#76b72f] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Contenido del Formulario por Pasos */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* ================= PASO 1: ¿TIPO DE VIVIENDA? ================= */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  ¿Tipo de vivienda?
                </h3>
                <p className="text-sm text-slate-600">
                  Seleccione el tipo de inmueble que desea aislar térmicamente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Opción CASA */}
                <button
                  type="button"
                  id="btn-option-casa"
                  onClick={() => handleSelectVivienda('CASA')}
                  className={`group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoVivienda === 'CASA'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      formData.tipoVivienda === 'CASA'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <Home className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold text-[#024327] tracking-wide">
                    CASA
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Unifamiliar, adosado o chalet
                  </span>
                </button>

                {/* Opción PISO */}
                <button
                  type="button"
                  id="btn-option-piso"
                  onClick={() => handleSelectVivienda('PISO')}
                  className={`group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoVivienda === 'PISO'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      formData.tipoVivienda === 'PISO'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <Building2 className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold text-[#024327] tracking-wide">
                    PISO
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Apartamento en edificio o comunidad
                  </span>
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#76b72f]" />
                  Aislamiento interior de alta eficiencia sin alterar fachadas
                </span>
              </div>
            </motion.div>
          )}

          {/* ================= PASO 2: ¿QUÉ TIPO DE BUHARDILLA TIENES? ================= */}
          {step === 2 && (
            <motion.div
              key="step2-buhardilla"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  ¿Qué tipo de buhardilla tienes?
                </h3>
                <p className="text-sm text-slate-600">
                  Selecciona la opción que mejor represente tu espacio bajo cubierta.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Opción 1: Buhardilla inhabitable */}
                <button
                  type="button"
                  id="btn-option-buhardilla-inhabitable"
                  onClick={() => handleSelectBuhardilla('Buhardilla inhabitable')}
                  className={`group relative flex flex-col rounded-[14px] border-2 transition-all duration-200 cursor-pointer text-left bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 overflow-hidden p-2.5 ${
                    formData.buhardilla === 'Buhardilla inhabitable'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  {/* Imagen de referencia */}
                  <div className="relative w-full h-36 sm:h-44 rounded-[10px] overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={APP_CONFIG.buhardillaInhabitableImg}
                      alt="Buhardilla inhabitable"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#024327]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      No acondicionada
                    </span>
                    {formData.buhardilla === 'Buhardilla inhabitable' && (
                      <div className="absolute top-2 right-2 bg-[#76b72f] text-white p-1 rounded-full shadow-md">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="px-1 pb-1">
                    <span className="block text-base sm:text-lg font-bold text-[#024327] tracking-tight">
                      Buhardilla inhabitable
                    </span>
                    <span className="block text-xs text-slate-500 mt-1 leading-relaxed">
                      Desván, trastero o espacio bajo tejado sin acondicionar (forjado o vigas a la vista).
                    </span>
                  </div>
                </button>

                {/* Opción 2: Buhardilla habitable */}
                <button
                  type="button"
                  id="btn-option-buhardilla-habitable"
                  onClick={() => handleSelectBuhardilla('Buhardilla habitable')}
                  className={`group relative flex flex-col rounded-[14px] border-2 transition-all duration-200 cursor-pointer text-left bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 overflow-hidden p-2.5 ${
                    formData.buhardilla === 'Buhardilla habitable'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  {/* Imagen de referencia */}
                  <div className="relative w-full h-36 sm:h-44 rounded-[10px] overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={APP_CONFIG.buhardillaHabitableImg}
                      alt="Buhardilla habitable"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#76b72f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Acondicionada
                    </span>
                    {formData.buhardilla === 'Buhardilla habitable' && (
                      <div className="absolute top-2 right-2 bg-[#76b72f] text-white p-1 rounded-full shadow-md">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="px-1 pb-1">
                    <span className="block text-base sm:text-lg font-bold text-[#024327] tracking-tight">
                      Buhardilla habitable
                    </span>
                    <span className="block text-xs text-slate-500 mt-1 leading-relaxed">
                      Espacio habitado o reformado (dormitorio, sala de estar, despacho o desván terminado).
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PASO 3: ¿USTED ES? ================= */}
          {step === 3 && (
            <motion.div
              key="step3-ocupante"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  ¿Usted es?
                </h3>
                <p className="text-sm text-slate-600">
                  Para calcular las subvenciones aplicables a su condición.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Opción PROPIETARIO */}
                <button
                  type="button"
                  id="btn-option-propietario"
                  onClick={() => handleSelectOcupante('PROPIETARIO')}
                  className={`group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoOcupante === 'PROPIETARIO'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      formData.tipoOcupante === 'PROPIETARIO'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <KeyRound className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold text-[#024327] tracking-wide">
                    PROPIETARIO
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Titular o copropietario de la vivienda
                  </span>
                </button>

                {/* Opción INQUILINO */}
                <button
                  type="button"
                  id="btn-option-inquilino"
                  onClick={() => handleSelectOcupante('INQUILINO')}
                  className={`group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoOcupante === 'INQUILINO'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors ${
                      formData.tipoOcupante === 'INQUILINO'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-bold text-[#024327] tracking-wide">
                    INQUILINO
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    En régimen de alquiler
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PASO 4: TIPO DE CALEFACCIÓN ================= */}
          {step === 4 && (
            <motion.div
              key="step4-calefaccion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  Tipo de calefacción
                </h3>
                <p className="text-sm text-slate-600">
                  ¿Qué sistema de climatización utiliza principalmente en su hogar?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                {/* Opción ELÉCTRICA */}
                <button
                  type="button"
                  id="btn-option-electrica"
                  onClick={() => handleSelectCalefaccion('ELÉCTRICA')}
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoCalefaccion === 'ELÉCTRICA'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      formData.tipoCalefaccion === 'ELÉCTRICA'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#024327]">
                    ELÉCTRICA
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Bomba calor / radiadores
                  </span>
                </button>

                {/* Opción GAS */}
                <button
                  type="button"
                  id="btn-option-gas"
                  onClick={() => handleSelectCalefaccion('GAS')}
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoCalefaccion === 'GAS'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      formData.tipoCalefaccion === 'GAS'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#024327]">
                    GAS
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Caldera de gas natural/propano
                  </span>
                </button>

                {/* Opción GASÓLEO */}
                <button
                  type="button"
                  id="btn-option-gasoleo"
                  onClick={() => handleSelectCalefaccion('GASÓLEO')}
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoCalefaccion === 'GASÓLEO'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      formData.tipoCalefaccion === 'GASÓLEO'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <Fuel className="w-6 h-6" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#024327]">
                    GASÓLEO
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Caldera diésel
                  </span>
                </button>

                {/* Opción OTRO */}
                <button
                  type="button"
                  id="btn-option-otro"
                  onClick={() => handleSelectCalefaccion('OTRO')}
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-[12px] border-2 transition-all duration-200 cursor-pointer text-center bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    formData.tipoCalefaccion === 'OTRO'
                      ? 'border-[#024327] bg-[#024327]/5 ring-2 ring-[#76b72f]'
                      : 'border-slate-200 hover:border-[#76b72f]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      formData.tipoCalefaccion === 'OTRO'
                        ? 'bg-[#024327] text-white'
                        : 'bg-emerald-50 text-[#024327] group-hover:bg-[#76b72f] group-hover:text-white'
                    }`}
                  >
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#024327]">
                    OTRO
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Pellets, leña o sin calefacción
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= PASO 5: SU CÓDIGO POSTAL ================= */}
          {step === 5 && (
            <motion.div
              key="step5-postal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  Su código postal
                </h3>
                <p className="text-sm text-slate-600">
                  Para verificar la zona climática y las ayudas autonómicas disponibles.
                </p>
              </div>

              <form onSubmit={handlePostalCodeSubmit} className="space-y-4 max-w-sm mx-auto pt-2">
                <div className="relative">
                  <input
                    type="text"
                    id="input-codigo-postal"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={5}
                    value={formData.codigoPostal}
                    onChange={handlePostalCodeChange}
                    placeholder="Ej. 28001"
                    className={`w-full text-center text-3xl font-extrabold tracking-widest py-4 px-4 rounded-[12px] border-2 transition-all outline-none text-[#024327] bg-slate-50/50 ${
                      errors.codigoPostal
                        ? 'border-red-500 bg-red-50/30 ring-2 ring-red-200'
                        : formData.codigoPostal.length === 5
                        ? 'border-[#76b72f] ring-2 ring-[#76b72f]/20 bg-emerald-50/20'
                        : 'border-slate-300 focus:border-[#024327] focus:bg-white'
                    }`}
                    autoFocus
                  />
                  {formData.codigoPostal.length === 5 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#76b72f]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {errors.codigoPostal && (
                  <p className="text-xs text-red-600 text-center font-medium">
                    {errors.codigoPostal}
                  </p>
                )}

                <div className="pt-4 max-w-xs mx-auto">
                  <button
                    type="submit"
                    id="btn-siguiente-paso5"
                    disabled={formData.codigoPostal.length !== 5}
                    className={`w-full py-3.5 px-6 rounded-[12px] font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                      formData.codigoPostal.length === 5
                        ? 'bg-[#76b72f] hover:bg-[#68a429] text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ================= PASO 6: DATOS DE CONTACTO (PASO FINAL) ================= */}
          {step === 6 && (
            <motion.div
              key="step6-contacto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#76b72f]/20 text-[#024327] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#024327]" />
                  ÚLTIMO PASO
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#024327] font-['Outfit']">
                  Ubicacion del domicilio 
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Un técnico de Enerova le contactará para detallarle el informe sin compromiso.
                </p>
              </div>

              <form onSubmit={handleSubmitFinal} className="space-y-3.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="input-nombre"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="input-nombre"
                      value={formData.nombre}
                      onChange={(e) => handleContactChange('nombre', e.target.value)}
                      placeholder="Ej. Carlos"
                      className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm transition outline-none ${
                        errors.nombre
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-slate-300 focus:border-[#024327] focus:ring-1 focus:ring-[#024327]'
                      }`}
                    />
                    {errors.nombre && (
                      <span className="text-[11px] text-red-600 font-medium">{errors.nombre}</span>
                    )}
                  </div>

                  {/* Apellidos */}
                  <div>
                    <label
                      htmlFor="input-apellidos"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                    >
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="input-apellidos"
                      value={formData.apellidos}
                      onChange={(e) => handleContactChange('apellidos', e.target.value)}
                      placeholder="Ej. García López"
                      className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm transition outline-none ${
                        errors.apellidos
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-slate-300 focus:border-[#024327] focus:ring-1 focus:ring-[#024327]'
                      }`}
                    />
                    {errors.apellidos && (
                      <span className="text-[11px] text-red-600 font-medium">{errors.apellidos}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="input-email"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    value={formData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="carlos.garcia@ejemplo.com"
                    className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm transition outline-none ${
                      errors.email
                        ? 'border-red-500 bg-red-50/20'
                        : 'border-slate-300 focus:border-[#024327] focus:ring-1 focus:ring-[#024327]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-600 font-medium">{errors.email}</span>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="input-telefono"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    id="input-telefono"
                    value={formData.telefono}
                    onChange={(e) => handleContactChange('telefono', e.target.value)}
                    placeholder="Ej. 612 345 678"
                    className={`w-full px-3.5 py-2.5 rounded-[10px] border text-sm transition outline-none ${
                      errors.telefono
                        ? 'border-red-500 bg-red-50/20'
                        : 'border-slate-300 focus:border-[#024327] focus:ring-1 focus:ring-[#024327]'
                    }`}
                  />
                  {errors.telefono && (
                    <span className="text-[11px] text-red-600 font-medium">{errors.telefono}</span>
                  )}
                </div>

                {/* Checkbox Consentimiento */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-left">
                    <input
                      type="checkbox"
                      id="checkbox-consentimiento"
                      checked={formData.consentimiento}
                      onChange={(e) => handleContactChange('consentimiento', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#024327] focus:ring-[#76b72f] accent-[#024327]"
                    />
                    <span className="text-[11px] text-slate-500 leading-snug">
                      Acepto la política de privacidad y el tratamiento de mis datos para recibir la propuesta energética gratuita.
                    </span>
                  </label>
                  {errors.consentimiento && (
                    <span className="block text-[11px] text-red-600 font-medium mt-1">
                      {errors.consentimiento}
                    </span>
                  )}
                </div>

                {/* Botón Mandatorio de Envío */}
                <div className="pt-3">
                  <button
                    type="submit"
                    id="btn-enviar-formulario-final"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-[12px] bg-[#76b72f] hover:bg-[#68a429] text-white font-extrabold text-base sm:text-lg uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <span>Solicitar Evalucacion</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="font-semibold text-slate-500 hover:text-[#024327] flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Modificar código postal
                </button>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-[#76b72f]" /> Datos protegidos 100%
                </span>
              </div>
            </motion.div>
          )}

          {/* ================= PANTALLA DE ÉXITO Y CONFIRMACIÓN ================= */}
          {step === 7 && (
            <motion.div
              key="step7-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="text-center py-6 sm:py-8 space-y-6"
            >
              {/* Icono de Confirmación */}
              <div className="w-20 h-20 mx-auto rounded-full bg-[#76b72f]/20 border-4 border-[#76b72f] flex items-center justify-center text-[#024327]">
                <CheckCircle2 className="w-12 h-12 text-[#024327]" />
              </div>

              {/* Anuncio Requerido por el Usuario */}
              <div className="space-y-3 px-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#024327] font-['Outfit']">
                  ¡SOLICITUD ENVIADA CON ÉXITO!
                </h3>
                <div className="bg-emerald-50 border-2 border-[#76b72f]/30 rounded-[12px] p-4 text-left max-w-md mx-auto shadow-sm">
                  <p className="text-[#024327] font-bold text-base sm:text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#76b72f] flex-shrink-0" />
                    Nos pondremos en contacto dentro de las 24 horas
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Hemos registrado los datos de su vivienda y un técnico especialista de{' '}
                    <strong className="text-[#024327]">Enerova</strong> analizará su código postal ({formData.codigoPostal}) para preparar el presupuesto y las subvenciones disponibles.
                  </p>
                </div>
              </div>

              {/* Resumen de los Datos Capturados */}
              <div className="bg-slate-50 rounded-[12px] p-4 text-left border border-slate-200 max-w-md mx-auto text-xs space-y-2">
                <div className="text-[11px] font-bold text-[#024327] uppercase tracking-wider border-b pb-1">
                  Resumen de su solicitud
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Vivienda:</span>
                    <strong className="text-[#024327]">{formData.tipoVivienda}</strong> ({formData.tipoOcupante})
                  </div>
                  <div>
                    <span className="text-slate-400 block">Buhardilla:</span>
                    <strong className="text-[#024327]">{formData.buhardilla}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Calefacción:</span>
                    <strong className="text-[#024327]">{formData.tipoCalefaccion}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Código Postal:</span>
                    <strong className="text-[#024327]">{formData.codigoPostal}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contacto:</span>
                    <strong className="text-[#024327]">{formData.nombre} {formData.apellidos}</strong>
                  </div>
                </div>
                <div className="pt-2 text-slate-500 border-t text-[11px]">
                  Confirmación interna remitida a <span className="text-[#024327] font-semibold">{APP_CONFIG.adminEmail}</span>
                </div>
              </div>

              {/* Botón para enviar otra solicitud si fuera necesario */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#024327] hover:text-[#76b72f] transition underline underline-offset-4"
                >
                  ¿Desea solicitar estudio para otra vivienda?
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pie del Formulario con sellos de garantía */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#76b72f]" />
          Ahorro garantizado de hasta 25%
        </span>
        <span className="flex items-center gap-1 font-medium text-[#024327]">
          Atención al cliente: {APP_CONFIG.adminEmail}
        </span>
      </div>
    </div>
  );
}
