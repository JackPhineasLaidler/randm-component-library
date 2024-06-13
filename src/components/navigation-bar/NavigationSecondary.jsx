import React from "react"

const NavigationSecondary = ({category}) => { //NEEDS TO RECIEVE CATEGORY FROM PARENT APP
  return (
    <div className={styles.navigation__secondary}>
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Gifts</Link>
          </li>
          <li>
            <Link href="/">Arts & Crafts</Link>
          </li>
          <li>
            <Link href="/">Lamps & Lighting</Link>
          </li>
          <li>
            <Link href="/">Pets</Link>
          </li>
          <li>
            <Link href="/">Candles</Link>
          </li>
          <li>
            <Link href="/">Pottery</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  )
};

export default NavigationSecondary;
