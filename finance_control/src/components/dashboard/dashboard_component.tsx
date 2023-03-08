import UserData from "../../model/userData";
import "./dashboard.css";
import DashboardAside from "./dashboard_aside";
import DashboardHeader from "./dashboard_header";
import React from "react";
import DashboardMain from "./dashboard_main";
import DashboardCard from "./dashboard_card";
import DashboardPeople from "./dashboard_people";
export default function DashboardComponent({ userData, setUserData,setlogedin }: { userData: UserData , setUserData: any,setlogedin: any}) {
    const [dashboardState, setDashboardState] = React.useState("dashboard");

    return (
        <div>
            <DashboardHeader userData={userData} setUserData={setUserData} setlogedin={setlogedin} />
            <div className="sideBySide">
                <DashboardAside userData={userData} setDashboardState={setDashboardState} />
                <div className="dashboardFocus">
                    {dashboardState === "dashboard"  && <DashboardMain userData={userData} />}
                    {dashboardState === "people"  && <DashboardPeople userData={userData} setUserData={setUserData} />}
                    {dashboardState === "card"  && <DashboardCard userData={userData} />}
                </div>
            </div>
        </div>
    );
}