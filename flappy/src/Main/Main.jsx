import React from 'react';
import style from './Main.module.css'

function Main() {
  return (
    <main className={style.main}>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1 className={style.h1}>Discover Your Next Favorite</h1>
        <p className={style.p}>Explore movies, get personalized recommendations, and create your watchlist.</p>
        <button className={style.btn}>Browse Movies</button>
        <button className={style.btn}>Trending</button>
        <div className={style.div}>
            <h3>Explore Categories</h3>
            <div className={style.categories}>
                <div className={style.item}>Action</div>
                <div className={style.item}>Romance</div>
                <div className={style.item}>Horror</div>
                <div className={style.item}>Comedy</div>
                <div className={style.item}>Thriller</div>
                <div className={style.item}>Animation</div>
                <div className={style.item}>Fantacy</div>
                <div className={style.item}>Crime</div>
                <div className={style.item}>Mystery</div>
            </div>
        </div>
      </div>
    </main>
  )
}

export default Main
