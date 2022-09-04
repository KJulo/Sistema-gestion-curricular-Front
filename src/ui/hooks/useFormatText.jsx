import React from 'react';

export function useFormatToURL(str) {
  // Quitar tildes
  let strURL = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Quitar espacios
  strURL = strURL.replace(' ', '-');
  // Quitar mayusculas
  strURL = strURL.toLowerCase();
  // Agregar slash para url
  return strURL;
}
