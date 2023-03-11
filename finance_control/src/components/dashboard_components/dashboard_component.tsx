import UserData from "../../model/userData";
import "./dashboard.css";
import DashboardAside from "./dashboard_aside";
import DashboardHeader from "./dashboard_header";
import React from "react";
import DashboardMain from "./dashboard_main";
import DashboardCard from "./dashboard_card_components/dashboard_card";
import DashboardPeople from "./dashboard_people_components/dashboard_people";
import { getCategorias } from "../../dao/categoria.dao";
export default function DashboardComponent({ userData, setUserData,setlogedin }: { userData: UserData , setUserData: any,setlogedin: any}) {
    const [dashboardState, setDashboardState] = React.useState("dashboard");
    const [categorias, setCategorias] = React.useState([]);

    React.useEffect(() => {
        getCategorias(userData.id_perfil).then((result) => {
            setCategorias(result);
        });
        userData.pessoas.forEach((pessoa) => {
            pessoa.creditos.map((credito) => {
                credito.valor = parseFloat(credito.valor as unknown as string);
            });
            pessoa.despesas.map((despesa) => {
                despesa.valor = parseFloat(despesa.valor as unknown as string);
            });
        });
    }, []);

    return (
        <div>
            <DashboardHeader userData={userData} setUserData={setUserData} setlogedin={setlogedin} />
            <div className="sideBySide">
                <DashboardAside userData={userData} setDashboardState={setDashboardState} />
                <div className="dashboardFocus">
                    {dashboardState === "dashboard"  && <DashboardMain userData={userData} />}
                    {dashboardState === "people"  && <DashboardPeople userData={userData} setUserData={setUserData} categorias={categorias} />}
                    {dashboardState === "card"  && <DashboardCard userData={userData} setUserData={setUserData} />}
                </div>
            </div>
        </div>
    );
}