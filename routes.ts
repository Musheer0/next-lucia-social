import { Bell, Bookmark, Home, Mail } from 'lucide-react';
import { ReactNode } from 'react';
type Route ={
    path:string,
    name:string,
    icon:ReactNode
}
export const PublicRoutes:Route[] = [
    {
        path: '/',
        name: 'Home',
        icon: <Home />
    },
    {
        path: '/notifications',  // Corrected typo here
        name: 'Notifications',
        icon: <Bell />
    },
    {
        path: '/messages',
        name: 'Messages',
        icon: <Mail />
    },
    {
        path: '/bookmarks',
        name: 'Bookmarks',
        icon: <Bookmark />
    },
];
