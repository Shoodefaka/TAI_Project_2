import React from 'react'
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ShieldIcon from '@mui/icons-material/Shield';
import FortIcon from '@mui/icons-material/Fort';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CasinoIcon from '@mui/icons-material/Casino';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const  SidebarData =  [
    {
        title: "Strona główna",
        icon: <HomeIcon/>,
    },
    {
        title: "Rodzinne",
        icon:<FamilyRestroomIcon/>,
    },
    {
        title: "Imprezowe",
        icon:<CelebrationIcon/>,
    },
    {
        title: "Strategiczne",
        icon:<FortIcon/>,
    },
    {
        title: "Fantasy",
        icon:<ShieldIcon/>,
    },
    {
        title: "Przygodowe",
        icon:<CasinoIcon/>,
    },
    {
        title: "Dodatki do gier",
        icon:<AddCircleIcon/>,
    },
    {
        title: "Karciane",
        icon:<ViewCarouselIcon/>,
    },
    {
        title: "Koszyk",
        icon: <ShoppingCartIcon/>,
    }
]