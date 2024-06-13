import React from "react"
import styles from './navigation-bar.module.scss';
import Link from "next/link";


const NavigationBar = ({children}) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.navigation__main}>
        <div>
            <Link href="/" className={styles.navigation__logo}>
              <img srcSet="logo.png" alt=""/>
              <span>RandMshire</span>
            </Link>

            <nav>
              <ul>
                <li>
                  <Link href="/">Etsy Store</Link>
                </li>
                <li>
                  <Link href="/">AirBnb</Link>
                </li>
              </ul>

              <div className={styles.navigation__cart}>
                <Link href="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="28" viewBox="0 0 24 21" fill="none">
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18C9.55228 18 10 18.4477 10 19ZM21 19C21 19.5523 20.5523 20 20 20C19.4477 20 19 19.5523 19 19C19 18.4477 19.4477 18 20 18C20.5523 18 21 18.4477 21 19Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* {cartQuantity ? <span>{cartQuantity}</span> : null} */}
                </Link>
              </div>
              
              {/* <div className={styles.navigation__hamburger} onClick={() => setModalVisible(!modalVisible)}> */}
              <div className={styles.navigation__hamburger}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </nav>
        </div>
      </div>
    


        {children}
    </div>
  )
};

export default NavigationBar;
