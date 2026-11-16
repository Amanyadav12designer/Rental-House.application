import {useState} from "react";

import{useNotifications} from "./NotificationContext";
import {MdNotificationsNone} from "react-icons/md";
import  "./NotificationBell.css";


export default function NotificationBell(){

const{unreadCount,notifications,clearAll,markAllRead}= useNotifications();

const [open,setOpen]= useState(false);


function toggle(){

    setOpen(!open);
    if(!open) markAllRead();



}


return (
    <div className="bell-wrap">
      <button type="button" className="bell-btn" onClick={toggle} aria-label="Notifications">
        <MdNotificationsNone className="bell-icon-svg" />
        {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
      </button>

      {open && (
        <div className="bell-panel">
          <div className="bell-panel-head">
            <strong>Notifications</strong>
            {notifications.length > 0 && (
              <button type="button" className="bell-clear" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="bell-empty">No notifications yet</p>
          ) : (
            <ul className="bell-list">
              {notifications.map((n) => (
                <li key={n.id} className="bell-item">
                  {n.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );



}