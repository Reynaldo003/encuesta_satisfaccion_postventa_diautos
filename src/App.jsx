import { useState } from "react";
import "./App.css";
 
const RATERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 
function RatingRow({ label, name, value, onChange }) {
  return (
    <div className="field-group rating-group">
      <label className="field-label">{label}</label>
      <div className="rating-buttons">
        {RATERS.map((n) => (
          <button
            key={n}
            type="button"
            className={`rating-btn ${value === n ? "active" : ""}`}
            onClick={() => onChange(name, value === n ? null : n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
 
function YesNoRow({ label, name, value, onChange }) {
  return (
    <div className="field-group yesno-group">
      <label className="field-label">{label}</label>
      <div className="toggle-buttons">
        <button
          type="button"
          className={`toggle-btn ${value === "si" ? "active" : ""}`}
          onClick={() => onChange(name, value === "si" ? null : "si")}
        >
          Sí
        </button>
        <button
          type="button"
          className={`toggle-btn ${value === "no" ? "active" : ""}`}
          onClick={() => onChange(name, value === "no" ? null : "no")}
        >
          No
        </button>
      </div>
    </div>
  );
}
 
export default function App() {
  const [form, setForm] = useState({
    orden: "",
    calAgenda: null,
    calGeneral: null,
    inventarioMostrado: null,
    consultorClaro: null,
    invitadoInventario: null,
    multipuntos: null,
    expectativa: null,
    mejora: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
 
  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };
 
  const validate = () => {
    const newErrors = {};
    if (!form.orden.trim()) newErrors.orden = true;
    if (!form.calAgenda) newErrors.calAgenda = true;
    if (!form.calGeneral) newErrors.calGeneral = true;
    if (!form.inventarioMostrado) newErrors.inventarioMostrado = true;
    if (!form.consultorClaro) newErrors.consultorClaro = true;
    if (!form.invitadoInventario) newErrors.invitadoInventario = true;
    if (!form.multipuntos) newErrors.multipuntos = true;
    if (!form.expectativa) newErrors.expectativa = true;
    return newErrors;
  };
 
  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };
 
  const handleReset = () => {
    setForm({
      orden: "",
      calAgenda: null,
      calGeneral: null,
      inventarioMostrado: null,
      consultorClaro: null,
      invitadoInventario: null,
      multipuntos: null,
      expectativa: null,
      mejora: "",
    });
    setErrors({});
    setSubmitted(false);
  };
 
  if (submitted) {
    return (
      <div className="app-bg">
        <div className="overlay" />
        <div className="card success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">¡Gracias por tu opinión!</h2>
          <p className="success-sub">
            Tu respuesta ha sido registrada. Nos ayuda a mejorar tu experiencia
            de servicio.
          </p>
          <button className="btn-guardar" onClick={handleReset}>
            Nueva encuesta
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <div className="app-bg">
      <div className="overlay" />
 
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <span className="brand-pill">Diautos · Postventa</span>
          <h1 className="card-title">Encuesta de Satisfacción</h1>
          <p className="card-subtitle">
            Ayúdanos a conocer tu experiencia.{" "}
            <strong>10 = experiencia extraordinaria.</strong>
          </p>
        </div>
 
        {/* Body */}
        <div className="card-body">
          {/* Número de orden */}
          <div className={`field-group ${errors.orden ? "has-error" : ""}`}>
            <label className="field-label">
              🔢 Número de Orden{" "}
              <span className="required">* (llenado por el consultor)</span>
            </label>
            <input
              className="text-input"
              type="text"
              placeholder="Ej. ORD-00123"
              value={form.orden}
              onChange={(e) => handleChange("orden", e.target.value)}
            />
            {errors.orden && (
              <span className="error-msg">Este campo es requerido</span>
            )}
          </div>
 
          {/* Divider */}
          <div className="section-label">Calificaciones de Servicio</div>
 
          {/* Rating 1 */}
          <div className={errors.calAgenda ? "has-error" : ""}>
            <RatingRow
              label="⭐ ¿Cómo calificarías la atención al agendar tu cita?"
              name="calAgenda"
              value={form.calAgenda}
              onChange={handleChange}
            />
            {errors.calAgenda && (
              <span className="error-msg">Selecciona una calificación</span>
            )}
          </div>
 
          {/* Rating 2 */}
          <div className={errors.calGeneral ? "has-error" : ""}>
            <RatingRow
              label="⭐ ¿Cómo calificarías tu experiencia general en el área de Servicio?"
              name="calGeneral"
              value={form.calGeneral}
              onChange={handleChange}
            />
            {errors.calGeneral && (
              <span className="error-msg">Selecciona una calificación</span>
            )}
          </div>
 
          {/* Divider */}
          <div className="section-label">Proceso de Entrega</div>
 
          {/* Yes/No grid */}
          <div className="yesno-grid">
            <div className={errors.inventarioMostrado ? "has-error" : ""}>
              <YesNoRow
                label="🚗 ¿Te mostraron el inventario inicial de tu vehículo?"
                name="inventarioMostrado"
                value={form.inventarioMostrado}
                onChange={handleChange}
              />
              {errors.inventarioMostrado && (
                <span className="error-msg">Requerido</span>
              )}
            </div>
 
            <div className={errors.consultorClaro ? "has-error" : ""}>
              <YesNoRow
                label="💬 ¿Tu consultor fue claro al explicar los trabajos realizados?"
                name="consultorClaro"
                value={form.consultorClaro}
                onChange={handleChange}
              />
              {errors.consultorClaro && (
                <span className="error-msg">Requerido</span>
              )}
            </div>
 
            <div className={errors.invitadoInventario ? "has-error" : ""}>
              <YesNoRow
                label="📋 ¿Tu consultor te invitó a realizar el inventario de tu vehículo?"
                name="invitadoInventario"
                value={form.invitadoInventario}
                onChange={handleChange}
              />
              {errors.invitadoInventario && (
                <span className="error-msg">Requerido</span>
              )}
            </div>
 
            <div className={errors.multipuntos ? "has-error" : ""}>
              <YesNoRow
                label="📄 ¿Tu consultor te entregó el reporte Multipuntos?"
                name="multipuntos"
                value={form.multipuntos}
                onChange={handleChange}
              />
              {errors.multipuntos && (
                <span className="error-msg">Requerido</span>
              )}
            </div>
 
            <div className={errors.expectativa ? "has-error" : ""}>
              <YesNoRow
                label="✅ ¿El trabajo realizado en tu vehículo cumplió con tu expectativa?"
                name="expectativa"
                value={form.expectativa}
                onChange={handleChange}
              />
              {errors.expectativa && (
                <span className="error-msg">Requerido</span>
              )}
            </div>
          </div>
 
          {/* Comentarios */}
          <div className="field-group">
            <label className="field-label">
              💡 ¿Qué podemos hacer para mejorar tu experiencia?
            </label>
            <textarea
              className="text-input textarea"
              placeholder="Escribe tus comentarios aquí..."
              value={form.mejora}
              onChange={(e) => handleChange("mejora", e.target.value)}
              rows={3}
            />
          </div>
        </div>
 
        {/* Footer */}
        <div className="card-footer">
          <span className="footer-note">
            Revisa tus respuestas antes de enviar.
          </span>
          <button className="btn-guardar" onClick={handleSubmit}>
            ⊙ Enviar encuesta
          </button>
        </div>
      </div>
    </div>
  );
}
 