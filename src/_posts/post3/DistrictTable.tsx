import React from 'react'
import styles from './table.module.css'
import data from '../../../public/assets/json/relation_id_list.json'
function DistrictTable() {
    return (
        <div className={styles.container}>
            {
                Object.entries(data).map(([key,region],i) => {
                    return (
                        <div key={i} className={styles["state-card"]}>
                            <div className={styles["state-name"]}>{key}</div>
                            <div className={styles["region-list"]}>
                                {region.districts.map((district,j) => 
                                    <div key={j} className={styles["region-item"]}>{district.name}</div>
                                )}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DistrictTable