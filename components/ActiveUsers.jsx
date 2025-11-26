'use client'

import { useState, useEffect } from 'react'
import { IoPeopleSharp } from "react-icons/io5";

export default function ActiveUsers() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUserCount()
    }, [])

    const fetchUserCount = async () => {
        try {
            const response = await fetch('/api/dashboard/stats')
            if (response.ok) {
                const data = await response.json()
                setTotalUsers(data.stats.totalUsers)
            }
        } catch (error) {
            console.error('Error fetching user count:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-3 items-center">
            <IoPeopleSharp color="#1A91F0" size={25}/>
            {loading ? 'Loading...' : `${totalUsers}+ Active Users`}
        </div>
    )
}