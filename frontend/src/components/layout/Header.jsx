import { Typography,AppBar,Box,Toolbar,IconButton, Tooltip, Backdrop } from '@mui/material'
import React, { Suspense, useState,lazy } from 'react'
import { orange } from "../../constants/color"
import { Menu as MenuIcon ,Search as SearchIcon,Add as AddIcon,Group as GroupIcon,Logout as LogoutIcon,Notifications as NotificationIcon } from "@mui/icons-material"


const SearchDialog  = lazy(()=>import("../specifics/Search"))
const NotificationDialog =lazy(()=>import("../specifics/Notifications"))


const Header = () => {
   const [isMobile,setIsMobile] =useState(false);
  const [isSearch ,setIsSearch] =useState(false);

  const [isNotification ,setIsNotification] =useState(false);




    const handleMobile = ()=>{
        setIsMobile(prev=>!prev)
    }

    const openSearch = () =>{
        setIsSearch(prev=>!prev)
    }

  
   
    const openNotification = ()=>{
         setIsNotification(prev=>!prev)
    }
    

    const logoutHandler = () =>{
        console.log("Logout");
    }

  return (
   <>
      <Box
      sx={{
        flexGrow:1
      }}
      height ={"4rem"}
      >
        <AppBar position ="static" sx={{
            bgcolor:orange,
        }} >

        <Toolbar>
        <Typography
        variant='h6'
        sx={{
            display:{xs:"none",sm :"block"},
        }}
        >Friend App</Typography>    
        <Box
        sx={{
            display:{xs:"block",sm :"none"},
        }}
        >
        <IconButton color="inherit" onClick ={handleMobile} ><MenuIcon /></IconButton>
        </Box>
        <Box sx={{
            flexGrow:1,
        }} />
       <Box>
<IconBtn
title={'Search'}
icon ={<SearchIcon/>}
onClick ={openSearch}
/>


<IconBtn
 title={'Notification'}
 icon={<NotificationIcon />}
  onClick={openNotification}
/>
<IconBtn
title={'Logout'}
icon ={<LogoutIcon/>}
onClick ={logoutHandler}
/>


        </Box>

        </Toolbar>   
        </AppBar>
      </Box>
      {
        isSearch && (
            <Suspense fallback ={<Backdrop open />}>
                <SearchDialog />

            </Suspense>
        )
      }
      {
        isNotification && (
            <Suspense fallback ={<Backdrop open />}>
                <NotificationDialog />

            </Suspense>
        )
      }
     
   </>
  )
}
const IconBtn =({ title,icon,onClick}) => {
    return (
        <Tooltip title={title}>
       < IconButton color="inherit" size ="large" onClick ={onClick} >
           {icon}
        </IconButton>

        </Tooltip>
    )
}

export default Header