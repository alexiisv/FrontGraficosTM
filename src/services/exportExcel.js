// src/utils/exportExcel.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName = 'datosexportados') => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No hay datos para exportar.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(file, `${fileName}.xlsx`);
};
