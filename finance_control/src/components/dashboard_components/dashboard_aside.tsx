import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserData from '../../model/userData';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function DashboardAside({ userData,setDashboardState }: { userData: UserData , setDashboardState : any}) {


    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" style={{backgroundColor: "#2F58CD", color: "white", boxShadow: "0 4px 2px -2px #3795BD"}}>
                    Dashboard Options
                </ListSubheader>
            }
            sx={{ width: '20vw', maxWidth: '20vw', bgcolor: '#2F58CD' , height: '90vh', maxHeight: '90vh', }}
        >
            <ListItemButton onClick={()=>{setDashboardState('dashboard')}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={()=>{setDashboardState('people')}}>
                <ListItemIcon>
                    <AccessibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Pessoas" />
            </ListItemButton>
            <ListItemButton onClick={()=>{setDashboardState('card')}}>
                <ListItemIcon>
                    <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary="Cartões" />
            </ListItemButton>
        </List>
    );


}