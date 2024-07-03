import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar  } from "react-pro-sidebar";
import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './Sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import CampaignIcon from '@mui/icons-material/Campaign';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import GradingIcon from '@mui/icons-material/Grading';
import InfoIcon from '@mui/icons-material/Info';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import PublishIcon from '@mui/icons-material/Publish';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useAuthContext} from "../hooks/useAuthContext";
const Sidebarre = ({changeClicked}) => {
  const { collapseSidebar } = useProSidebar();
  const {user} = useAuthContext()
  return (
    <div className='position-bar' >
    <div className="sidebar">
    <Sidebar className="app">
      <Menu>
      <MenuItem
            onClick={() => {
              collapseSidebar();
              changeClicked()
            }}
            className="menu1"
            icon={
              <MenuIcon
                
              />
            }
          >
          </MenuItem>
        <MenuItem icon={<DashboardIcon/>} component={<Link to="/" className="link" />}> Dashboard </MenuItem>
        <SubMenu icon={<CampaignIcon/>} label='Offers'>
          <MenuItem icon={<ListAltIcon/>} component={<Link to="/offer" className="link" />}> Offers </MenuItem>
          {user.user.capacity !='Student' &&<MenuItem icon={<PublishIcon/>} component={<Link to="/publish" className="link" />}> Publish Offer </MenuItem>}
        </SubMenu>
        {user.user.capacity !='Student' && <MenuItem icon={<ReceiptIcon/>} component={<Link to="/applications" className="link" />}> Applications </MenuItem>}        
        {(user.user.capacity !='Student' && user.user.capacity !='Enterprise') && <MenuItem icon={<DoneAllIcon/>} component={<Link to="/validation" className="link" />}> Validation </MenuItem>}
        {user.user.capacity ==='Student' && <MenuItem icon={<SummarizeIcon/>} component={<Link to="/report" className="link" />}> Report </MenuItem>}
        {(user.user.capacity ==='Admin' || user.user.capacity ==='Teacher')&& <MenuItem icon={<GradingIcon/>} component={<Link to="/report/view" className="link" />}> View Reports </MenuItem>}
        {user.user.capacity !='Enterprise' && user.user.capacity !='Student' && <MenuItem icon={<ManageSearchIcon/>}  component={<Link to="/pfe" className="link" />}> PFE Details </MenuItem>}
        {user.user.capacity ==='Student' && <MenuItem icon={<ManageSearchIcon/>}  component={<Link to="/pfeinfo" className="link" />}> PFE Details </MenuItem>}
        {user.user.capacity ==='Admin' &&<SubMenu icon={<AdminPanelSettingsIcon/>} label="Administrative">
          <MenuItem icon={<PeopleIcon/>} component={<Link to="/users" className="link" />}> Users </MenuItem>
          <MenuItem icon={<RecentActorsIcon/>} component={<Link to="/appointments" className="link" />}> Appointment </MenuItem>
        </SubMenu>}
        <SubMenu icon={<SettingsIcon/>} label="Settings">
          <MenuItem icon={<InfoIcon/>} component={<Link to="/about" className="link" />}> About </MenuItem>
          <MenuItem icon={<ConnectWithoutContactIcon/>} component={<Link to="/contact" className="link" />}> Contact </MenuItem>
        </SubMenu>

      </Menu>
    </Sidebar>
   
  </div>
  </div>
  )
}

export default Sidebarre