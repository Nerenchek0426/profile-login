import React, { createContext, useContext, useState } from 'react';
import { User, GraduationCap, ScrollText, TableProperties, Mail } from 'lucide-react';

const LinksContext = createContext();

export const LinksProvide = ({children}) => {
    const [currentLink, setCurrentLink] = useState();

    const links = [{
        name: 'Профиль',
        url: '/Profile',
        icon: <User color="white" size={28} />,
        sublinks: [
          {
            name: 'Мой профиль',
            url: '/Profile/MyProfile'
          },
          {
            name: 'Настройки',
            url: '/Profile/Settings'
          },
          {
            name: 'Сменить пароль',
            url: '/Profile/ChangePass'
          }
        ]},
        
        {
            name: 'Ведомости',
            url: '/GradeReport',
            icon: <ScrollText color="white" size={28} />,
            sublinks: [
                {
                    name: 'Учебные',
                    url: '/GradeReport/Studying'
                },
                {
                    name: 'Экзаменнационные листы',
                    url: '/GradeReport/Exlist'
                },
                {
                    name: 'Инструкции',
                    url: '/GradeReport/Instruc'
                }
        ]},

        {
            name: 'Входящие',
            url: 'http://192.168.2.151:3000',
            icon: <Mail color="white" size={28} />},
        {
        name: 'Расписание',
        url: 'http://185.22.232.236/schedule',
        icon: <TableProperties color="white" size={28} />},
        {
        name: 'Дипломники',
        url: '/Graduates',
        icon: <GraduationCap color="white" size={28} />,
        sublinks: [
            {
                name: 'Учебные',
                url: '/Graduates/Studying'
            },
            {
                name: 'Экзаменнационные листы',
                url: '/Graduates/Exlist'
            },
            {
                name: 'Инструкции',
                url: '/Graduates/Instruc'
            }
        ]},
    ]

    const value = {
        links, 
        currentLink,
        setCurrentLink
    }

    return (
        <LinksContext.Provider value={value}>
          {children}
        </LinksContext.Provider>
    );
};

export const useLinks = () => useContext(LinksContext);
