import { Routes ,Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import SelectHabitacion from "../pages/SelectHabitacion";


const AppRoutes = () => (

    <Routes>
        <Route path="/" element ={<Inicio />} />
        <Route path="/analytics" element ={<SelectHabitacion />} />
    </Routes>
)

export default AppRoutes;