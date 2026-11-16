import {createContext,useContext,useState} from "react";

const NotificationContext = createContext(null);

export  function NotificationProvider({children}){

    const [notifications,setNotifications]= useState([]);

    function addNotifications(text){

        const newItem={

id:Date.now() + Math.random(),
text,read:false, createdAt: Date.now()

        };

        setNotifications((prev)=>[newItem, ...prev]);
    }


    function markAllRead(){

        setNotifications((prev)=>prev.map((n)=>({...n,read:true})));
    }

    function clearAll(){

        setNotifications([]);
    }


    const unreadCount= notifications.filter((n)=>!n.read).length;


    return(


<NotificationContext.Provider

value={{notifications,addNotifications,unreadCount,clearAll,markAllRead}}>
    {children}
</NotificationContext.Provider>



    )



}

export function useNotifications(){

    return useContext(NotificationContext);
}