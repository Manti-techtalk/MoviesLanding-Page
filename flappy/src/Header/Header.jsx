import React from 'react'
import style from './Header.module.css'

function Header() {
  return (
    <header className={style.header}>
        <p><b>Film<span className={style.span}>Buff</span></b>
        <div className={style.underline}></div>
        </p>
        <ul className={style.ul}>
            <li className={style.li}>Home</li>
            <li className={style.li}>About</li>
            <li className={style.li}>Movies</li>
        </ul>
        <div className={style.search}>
        <input type="search" name="search" id="src" placeholder='search movies' className={style.input}/><i class="fa-solid fa-magnifying-glass" ></i>
        </div>
        <button className={style.btn}>Sign-In</button>
        
    </header>
  )
}

export default Header