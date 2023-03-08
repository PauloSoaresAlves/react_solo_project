import React from "react";
import UserData from "../../model/userData";
import "./dashboard.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DashboardHeader({ userData,setUserData,setlogedin }: { userData: UserData,setUserData:any,setlogedin:any }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setUserData({name: "", password: "", id_perfil: 0, pessoas: []});
        setlogedin(false);
    };


    return (
        <header className="dashboardHeader">
            <div className="perfilDropdown">
                <button onClick={handleClick} className="dashboardIcon"><img src="https://source.unsplash.com/user/c_v_r" alt="Free unsplash image" /></button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    className="dropdownMenu"
                >
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
            </div>
            <h1 className="userGreetings">Olá {userData.name}!</h1>
        </header>
    );
}