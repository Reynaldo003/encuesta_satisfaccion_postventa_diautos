// src/lib/apiServicio.js

const API_URL =
  import.meta.env.VITE_API_URL || "https://crmchevrolet.grupoautomotrizryr.com/encuestas";
function limpiarTexto(valor) {
  return String(valor ?? "").trim();
}

function convertirNumero(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : 0;
}

// Convierte escala 1-10 a 1-5
function convertirCalificacion(valor) {
  return Math.ceil(Number(valor) / 2);
}

function obtenerMensajeError(data) {
  if (!data) {
    return "No se pudo guardar la encuesta en el servidor.";
  }

  if (typeof data.detail === "string" && data.detail.trim()) {
    return data.detail;
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data === "object") {
    for (const valor of Object.values(data)) {
      if (Array.isArray(valor) && valor.length > 0) {
        return String(valor[0]);
      }

      if (typeof valor === "string" && valor.trim()) {
        return valor;
      }
    }
  }

  return "No se pudo guardar la encuesta en el servidor.";
}

export async function crearEncuestaServicio(respuestas) {
  const payload = {
    numero_OS: limpiarTexto(respuestas.orden),

    // Convierte 1-10 → 1-5
    satisfaccion_agendar_cita:
      convertirCalificacion(respuestas.calAgenda),

    satisfaccion_exp_area_servicio:
      convertirCalificacion(respuestas.calGeneral),

    // Convierte Sí/No → true/false
    mostraron_inventario_inicial_vehiculo:
      respuestas.inventarioMostrado === "Sí",

    explicacion_clara_trabajo_realizado:
      respuestas.consultorClaro === "Sí",

    invitacion_realizar_inventario:
      respuestas.invitadoInventario === "Sí",

    entrego_reporte_multipuntos:
      respuestas.multipuntos === "Sí",

    trabajo_realizado_cumple_espectativa:
      respuestas.expectativa === "Sí",

    comentario:
      limpiarTexto(respuestas.mejora),
  };

  console.log(
    "URL:",
    API_URL + "/api/public/encuestas-servicio/"
  );

  console.log("PAYLOAD:", payload);

  const respuesta = await fetch(
  API_URL + "/api/public/encuestas-servicio/",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  const texto = await respuesta.text();

  console.log("RESPUESTA RAW:", texto);

  let data = null;

  try {
    data = JSON.parse(texto);
  } catch {
    data = texto;
  }

  if (!respuesta.ok) {
    console.log("ERROR:", data);

    throw new Error(
      obtenerMensajeError(data)
    );
  }

  return data;
}