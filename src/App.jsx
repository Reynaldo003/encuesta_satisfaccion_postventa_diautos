import { useState } from "react";
import "./App.css";
import { crearEncuestaServicio } from "./lib/apiServicio";
 
const GOLD = "#C9A75D";
const GOLD_DIM = "rgba(201,167,93,0.15)";
const GOLD_BORDER = "rgba(201,167,93,0.40)";
const DARK = "#0F172A";

const ASESORES = [
  "ALBERTO TORRES",
  "ALMA HERNANDEZ",
  "ANGELES VALERIO",
  "CARLOS VAZQUEZ",
  "DAVID RIOS",
  "GABRIELA POMPEYO",
  "GUADALUPE SANCHEZ",
  "ISRAEL NIETO",
  "IVETTE MATA",
  "JAIR SOLARES",
  "JAVIER VALENCIA",
  "JOSUE SEGOVIA",
  "KARINA CORTES",
  "LORENZA RINCON",
  "LUIS DAVID CASTILLO",
  "MAGDALENA MOLINA",
  "PEDRO MENDOZA",
  "RAQUEL SOLIS",
  "REYNA MORA",
  "ROMAN LUGO",
  "SILVIA LARA",
  "CASA",
  "GRISELDA NEVAREZ",
  "EDER MONTERO",
  "GASPAR PANTOJA",
];
 
function BtnContinuar({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "rgba(201,167,93,0.25)" : `linear-gradient(135deg, ${GOLD}, #a8782e)`,
        color: disabled ? "rgba(255,255,255,0.3)" : DARK,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className="mt-8 self-end px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 shadow-lg"
    >
      Continuar →
    </button>
  );
}
 
function RatingStep({ step, value, onChange, onNext, onBack }) {
  return (
    <StepShell step={step} onBack={onBack}>
      <div className="flex flex-wrap gap-3 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => { onChange(n); setTimeout(onNext, 260); }}
            style={value === n
              ? { background: GOLD, color: DARK, borderColor: GOLD, boxShadow: `0 0 16px rgba(201,167,93,0.5)` }
              : { background: "rgba(255,255,255,0.07)", color: "white", borderColor: "rgba(255,255,255,0.15)" }
            }
            className="w-14 h-14 rounded-xl text-lg font-bold border transition-all duration-200 hover:scale-105"
          >
            {n}
          </button>
        ))}
      </div>
      {value && <BtnContinuar onClick={onNext} />}
    </StepShell>
  );
}
 
function YesNoStep({ step, value, onChange, onNext, onBack }) {
  const select = (v) => { onChange(v); setTimeout(onNext, 300); };
  return (
    <StepShell step={step} onBack={onBack}>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {["Sí", "No"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => select(opt)}
            style={value === opt
              ? { background: GOLD_DIM, borderColor: GOLD, color: GOLD }
              : { background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }
            }
            className="flex items-center gap-3 px-8 py-4 rounded-2xl border text-left text-base font-bold transition-all duration-200 min-w-[160px] hover:scale-105"
          >
            <span
              style={value === opt
                ? { background: GOLD, borderColor: GOLD }
                : { borderColor: "rgba(255,255,255,0.4)" }
              }
              className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
            />
            {opt}
          </button>
        ))}
      </div>
      {value && <BtnContinuar onClick={onNext} />}
    </StepShell>
  );
}
 
function TextStep({ step, value, onChange, onNext, onBack, placeholder = "Su respuesta..." }) {
  return (
    <StepShell step={step} onBack={onBack}>
      <div className="mt-6 w-full max-w-2xl">
        <div
          style={{ borderColor: GOLD_BORDER, background: "rgba(255,255,255,0.05)" }}
          className="flex items-start gap-3 border rounded-2xl px-5 py-4 transition-all"
        >
          <span style={{ color: GOLD }} className="mt-0.5 text-lg">✎</span>
          <textarea
            rows={3}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-white placeholder-white/30 text-base w-full resize-none outline-none"
          />
        </div>
        <p className="text-white/30 text-sm mt-2">Seleccione continuar cuando esté listo.</p>
      </div>
      <BtnContinuar onClick={onNext} />
    </StepShell>
  );
}
 
function OrderStep({ step, value, onChange, onNext, onBack }) {
  return (
    <StepShell step={step} onBack={onBack}>
      <div className="mt-6 w-full max-w-2xl">
        <div
          style={{ borderColor: GOLD_BORDER, background: "rgba(255,255,255,0.05)" }}
          className="flex items-center gap-3 border rounded-2xl px-5 py-4 transition-all"
        >
          <span style={{ color: GOLD }}></span>
          <input
            type="text"
            placeholder="Ej. ORD-00123"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-white placeholder-white/30 text-lg font-bold w-full outline-none"
          />
        </div>
        <p className="text-white/30 text-sm mt-2">Llenado por el consultor de servicio.</p>
      </div>
      <BtnContinuar onClick={onNext} disabled={!value.trim()} />
    </StepShell>
  );
}

function AsesorStep({ step, value, onChange, onNext, onBack }) {
  const select = (nombre) => { onChange(nombre); setTimeout(onNext, 300); };
  return (
    <StepShell step={step} onBack={onBack}>
      <div
        className="grid mt-6 gap-2.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}
      >
        {ASESORES.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => select(a)}
            style={value === a
              ? { background: "rgba(201,167,93,0.22)", borderColor: GOLD, color: GOLD, boxShadow: `0 0 14px rgba(201,167,93,0.35)` }
              : { background: "rgba(255,255,255,0.06)", borderColor: "rgba(201,167,93,0.30)", color: "rgba(255,255,255,0.80)" }
            }
            className="px-3 py-3.5 rounded-2xl border text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105 text-center leading-snug"
          >
            {a}
          </button>
        ))}
      </div>
      {value && <BtnContinuar onClick={onNext} />}
    </StepShell>
  );
}
 
function StepShell({ step, onBack, children }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed inset-0">
        <img src="/Image_75m35z75m35z75m.png" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "rgba(15,23,42,0.78)" }} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 0% 100%, rgba(201,167,93,0.08) 0%, transparent 55%),
                       radial-gradient(ellipse at 100% 0%, rgba(201,167,93,0.06) 0%, transparent 55%)`
        }} />
      </div>
 
      <div className="relative z-10 flex flex-col min-h-screen py-10 px-6">
        <div className="flex justify-center mb-6">
          <span style={{ borderColor: GOLD_BORDER, color: GOLD }}
            className="border text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full backdrop-blur">
            Diautos · Postventa
          </span>
        </div>
 
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
            Encuesta de Satisfacción
          </h1>
          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Ayúdanos a conocer su experiencia de servicio.{" "}
            <strong style={{ color: GOLD }}>10 = experiencia extraordinaria.</strong>
          </p>
        </div>
 
        <div className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <span style={{ background: GOLD_DIM, borderColor: GOLD_BORDER, color: GOLD }}
                className="text-xs font-bold px-4 py-1.5 rounded-full border">
                {step.pill}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-2">
              {step.question}
            </h2>
            <div className="flex flex-col">{children}</div>
          </div>
        </div>
 
        <div className="flex items-center justify-between mt-10 w-full max-w-2xl mx-auto">
          <button
            onClick={onBack}
            style={{ background: GOLD_DIM, borderColor: GOLD_BORDER, color: GOLD }}
            className="flex items-center gap-2 font-bold px-6 py-3 rounded-full transition-all text-sm border hover:brightness-110"
          >
            ← Regresar
          </button>
          <span className="text-white/25 text-xs hidden sm:block">
            Seleccione una opción para continuar automáticamente.
          </span>
        </div>
      </div>
    </div>
  );
}
 
function SuccessScreen({ onReset }) {
  return (
    <div style={{ background: DARK }} className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div style={{ background: `linear-gradient(135deg, ${GOLD}, #a8782e)`, boxShadow: `0 0 40px rgba(201,167,93,0.4)` }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          <span style={{ color: DARK }} className="font-bold">✓</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">¡Gracias por su opinión!</h2>
        <p className="text-white/50 mb-8 leading-relaxed">
          Su respuesta ha sido registrada. Nos ayuda a mejorar su experiencia de servicio.
        </p>
        <button onClick={onReset}
          style={{ background: `linear-gradient(135deg, ${GOLD}, #a8782e)`, color: DARK }}
          className="font-bold px-8 py-3 rounded-full transition-all hover:brightness-110 shadow-lg">
          Nueva encuesta
        </button>
      </div>
    </div>
  );
}
 
function LoadingScreen() {
  return (
    <div style={{ background: DARK }} className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div
          style={{ borderColor: GOLD, borderTopColor: "transparent" }}
          className="w-16 h-16 rounded-full border-4 animate-spin mx-auto mb-6"
        />
        <p style={{ color: GOLD }} className="text-lg font-bold tracking-wide">
          Enviando respuestas...
        </p>
      </div>
    </div>
  );
}
 
function ErrorScreen({ mensaje, onReintentar, onReset }) {
  return (
    <div style={{ background: DARK }} className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          style={{ border: `2px solid ${GOLD}`, color: GOLD }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
        >
          ✕
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Error al enviar</h2>
        <p className="text-white/50 mb-8 leading-relaxed text-sm">{mensaje}</p>
        <div className="flex gap-4 justify-center">
          <button onClick={onReintentar}
            style={{ background: `linear-gradient(135deg, ${GOLD}, #a8782e)`, color: DARK }}
            className="font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all">
            Reintentar
          </button>
          <button onClick={onReset}
            style={{ background: GOLD_DIM, borderColor: GOLD_BORDER, color: GOLD }}
            className="font-bold px-6 py-3 rounded-full border hover:brightness-110 transition-all">
            Nueva encuesta
          </button>
        </div>
      </div>
    </div>
  );
}
 
const STEPS = [
  { id: "orden",              pill: "Orden",        type: "order",  question: "¿Cuál es su número de orden?" },
  { id: "asesor",             pill: "Asesor",       type: "asesor", question: "¿Qué asesor le atendió?" },
  { id: "calAgenda",          pill: "Calificación", type: "rating", question: "¿Cómo calificaría la atención recibida al momento de agendar su cita?" },
  { id: "calGeneral",         pill: "Calificación", type: "rating", question: "¿Cómo calificaría su experiencia general en el área de Servicio?" },
  { id: "inventarioMostrado", pill: "Proceso",      type: "yesno",  question: "¿Le mostraron el inventario inicial de su vehículo?" },
  { id: "consultorClaro",     pill: "Proceso",      type: "yesno",  question: "¿Su consultor de servicio fue claro al explicarle los trabajos realizados?" },
  { id: "invitadoInventario", pill: "Proceso",      type: "yesno",  question: "¿El consultor le invitó a realizar el inventario de su vehículo?" },
  { id: "multipuntos",        pill: "Proceso",      type: "yesno",  question: "¿Su consultor de servicio le entregó su reporte Multipuntos?" },
  { id: "expectativa",        pill: "Resultado",    type: "yesno",  question: "¿El trabajo realizado en su vehículo cumplió con su expectativa?" },
  { id: "mejora",             pill: "Comentarios",  type: "text",   question: "¿Qué podemos hacer para mejorar su experiencia?", placeholder: "Escriba sus comentarios aquí...", optional: true },
];
 
const FORM_INICIAL = {
  orden: "", asesor: null, calAgenda: null, calGeneral: null,
  inventarioMostrado: null, consultorClaro: null,
  invitadoInventario: null, multipuntos: null,
  expectativa: null, mejora: "",
};
 
export default function App() {
  const [current, setCurrent] = useState(0);
  const [estado, setEstado] = useState("encuesta");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ ...FORM_INICIAL });
 
  const step = STEPS[current];
  const handleChange = (val) => setForm((p) => ({ ...p, [step.id]: val }));
 
  const handleNext = async () => {
    if (current === STEPS.length - 1) {
      setEstado("loading");
      try {
        await crearEncuestaServicio(form);
        setEstado("success");
      } catch (err) {
        setErrorMsg(err.message || "Error desconocido al enviar.");
        setEstado("error");
      }
      return;
    }
    setCurrent((c) => c + 1);
  };
 
  const handleBack = () => current > 0 && setCurrent((c) => c - 1);
 
  const handleReset = () => {
    setForm({ ...FORM_INICIAL });
    setCurrent(0);
    setEstado("encuesta");
    setErrorMsg("");
  };
 
  if (estado === "loading") return <LoadingScreen />;
  if (estado === "success") return <SuccessScreen onReset={handleReset} />;
  if (estado === "error")   return <ErrorScreen mensaje={errorMsg} onReintentar={() => handleNext()} onReset={handleReset} />;
 
  const props = { step, value: form[step.id], onChange: handleChange, onNext: handleNext, onBack: handleBack };
 
  return (
    <>
      {step.type === "order"  && <OrderStep  {...props} />}
      {step.type === "asesor" && <AsesorStep {...props} />}
      {step.type === "rating" && <RatingStep {...props} />}
      {step.type === "yesno"  && <YesNoStep  {...props} />}
      {step.type === "text"   && <TextStep   {...props} placeholder={step.placeholder} />}
    </>
  );
}