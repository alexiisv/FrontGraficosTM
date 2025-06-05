import { useMemo } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { esES} from '@mui/x-data-grid/locales';  //poner en Español las tablas
import { Box, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import { useData } from '../context/DataContext';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { exportToExcel } from '../services/exportExcel';
import {Button} from '@mui/material';



const COLOR_CHIP_MAP = {
  Rojo: 'error',
  Azul: 'primary',
  Verde: 'success',
  Amarillo: 'warning',
};

function UserTable({ title='Tabla', data= [], loading = false, error = null }) {

  // Cargar datos iniciales
  // const { data, loading, error } = useData();

  // console.log(data)
 

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'tipo', headerName: 'Color', width: 90 },
    {
      field: 'tipo',
      headerName: 'Color',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={<ColorLensIcon />}
          label={params.value}
          color={COLOR_CHIP_MAP[params.value] || 'default'}
          size="small"
          variant="outlined"
        />
      ),
    },
    { field: 'cama', headerName: 'Cama', width: 150 },
    { field: 'pabellon', headerName: 'Dependencia', width: 150 },
    { field: 'paciente', headerName: 'Paciente', flex: 1 },
    { field: 'tiempoInicial', headerName: 'Tiempo Inicial', flex: 1 },
    { field: 'tiempoFinal', headerName: 'Tiempo Final', flex: 1 },
    { field: 'difTiempo', headerName: 'Tiempo Total (min)', width: 150 },
  ];

  const rows = useMemo(() => data.map((item, index) => ({
    id: index + 1,
    tipo: item.evento.tipo,
    cama: item.evento.cama,
    pabellon: item.evento.pabellon,
    paciente: item.evento.paciente,
    tiempoInicial: item.evento.tiempoInicial,
    tiempoFinal: item.evento.tiempoFinal,
    difTiempo: item.tiempoTotalMinutos

  })), [data]);


  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h5" gutterBottom component="div">
        {title}
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={1}>
  <Button
    variant="contained"
    color="success"
    onClick={() => exportToExcel(rows)}
  >
    Exportar a Excel
  </Button>
</Box>
      <Box sx={{ height: 400, width: '100%', backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 15 }}>
        {/* <Box className="height: 400, width: '100%', bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-md"> */}

        {loading && (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        )}

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* {loading && <CircularProgress />} */}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // disableRowSelectionOnClick
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            // sx={{
            //   border: 1,
            // }}
          />
        )}
      </Box>
    </>
  );
};


export default UserTable;

