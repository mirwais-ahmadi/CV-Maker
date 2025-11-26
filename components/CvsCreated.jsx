'use client'

import { useState, useEffect } from 'react'
import { HiDocumentDuplicate } from "react-icons/hi";

export default function CvsCreated() {
    const [todayCVs, setTodayCVs] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTodayCVs()
    }, [])

    const fetchTodayCVs = async () => {
        try {
            const response = await fetch('/api/dashboard/stats')
            if (response.ok) {
                const data = await response.json()
                setTodayCVs(data.stats.todayCVs)
            }
        } catch (error) {
            console.error('Error fetching today CVs:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4 m-10 bg-lighter max-w-7xl mx-auto rounded-xl flex justify-center items-center gap-6">
            <HiDocumentDuplicate size={70} color="#1A91F0" className="mr-10"/>
            <div className="bg-white py-3 px-7 text-3xl lg:text-4xl rounded-lg">
                {loading ? '...' : todayCVs}
            </div>
            <p className="text-xl lg:text-3xl">CVs Created Today</p>
        </div>
    )
}