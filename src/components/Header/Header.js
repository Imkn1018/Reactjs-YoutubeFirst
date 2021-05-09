import React from 'react'
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons"

export const Header = (props) => {
  return (
    <div>
     
     <div>
       <Link to="/">Video Tube</Link>
     </div>
     <div>
       <form>
         <input type="text" placeholder="Search" />
         <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
       </form>
     </div>
    </div>
  )
}
