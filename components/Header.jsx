import React, { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
import json_NavLinks from '../data/links.json'
import AddLink from "./forms/AddLink"
import { useRouter } from "next/router"
import Link from "next/link"
import Banner from "./Banner"
import { useForce } from "../utils/useForce"




const Header = () => {
  const [links, setLinks] = useState(json_NavLinks);
  const router = useRouter();



  return (
    <>
    <div className={styles.nav_container}>
      <nav>
        <ul className={styles.nav}>
          <li className={`${styles.nav_item} ${router.asPath == '/' && styles.active}`}>
            <Link href='/'>
            Home
            </Link>
          </li>
          {links.map((link, index) => {
            return (
              <li key={index} className={`${styles.nav_item} ${router.asPath == link.slug && styles.active}`}>
                <Link href={link.slug}>
                  {link.link}
                </Link>
              </li>
            )
          })}
          <li className={styles.nav_item}>
            <AddLink setLinks={setLinks} />
          </li>
        </ul>
      </nav>
    </div>
    <Banner />
    </>
  )
}




export default Header
