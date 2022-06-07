import React, { useState, useEffect, Suspense } from 'react'
import styles from '../styles/Banner.module.scss'
import ModifyBanner from "./forms/ModifyBanner";
import { useRouter } from "next/router";

const Banner = () => {
    const [banner, setBanner] = useState('')
    const router = useRouter();
    const path = router.asPath === '/' ? '/home' : router.asPath;

    useEffect(() => {
        fetch(`/api/banner/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setBanner(data.banner));
    }, [router.asPath])

    return (
        <div className={styles.container}>
            <ModifyBanner banner={banner} setBanner={setBanner} />
            <div className={styles.image_wrapper}>
                <img className={styles.image} src={banner.image} alt="" />
            </div>
            <figure>
                <blockquote cite="Site owner">
                    <p>
                        {banner.text}
                    </p>
                </blockquote>
                <figcaption><cite>{banner.source}</cite></figcaption>
            </figure>
        </div>
    )
}

export default Banner