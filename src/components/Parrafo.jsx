import React from 'react'

const Parrafo = ({count}) => {
  const mensaje='Buenos días'
  let saludo='Front End'
return <div>
  <p>{mensaje}, ésta es la clase de {saludo}.</p>
  <h3>{count}</h3>
  
   </div>
}

export default Parrafo