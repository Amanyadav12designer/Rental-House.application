export default function RoleSelection({onLogin}){


    return(
        
        
<div className="container title">
  

    <div className="role-cards">
        

        <div className ="role-card">
            
          
  
          
            



<button onClick={()=>onLogin("Landlord")} className="role-button" > Landlord</button></div>

<div className="role-card2">

  
    

<button onClick={()=>onLogin("Tenant")}  className="role-button" > Tenant</button>
</div>
    </div>
    </div>
    

    )
    
}