'use client'

import { useState, useEffect } from 'react'
import { MdPerson, MdEmail, MdDescription } from 'react-icons/md'
import { FaUsers, FaEnvelopeOpenText } from 'react-icons/fa'
import { RiFileList3Line } from 'react-icons/ri'

export default function Dashboard() {
    const [stats, setStats] = useState({
        todayCVs: 0,
        totalUsers: 0,
        totalMessages: 0
    })
    const [recentCVs, setRecentCVs] = useState([])
    const [recentMessages, setRecentMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/dashboard/stats')
            if (response.ok) {
                const data = await response.json()
                setStats(data.stats)
                setRecentCVs(data.recentCVs || [])
                setRecentMessages(data.recentMessages || [])
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffHours < 1) {
            return 'Just now'
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`
        } else if (diffDays === 1) {
            return '1 day ago'
        } else {
            return `${diffDays} days ago`
        }
    }

    const StatCard = ({ title, value, icon, color, description }) => (
        <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {loading ? '...' : value}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">{description}</p>
                </div>
                <div className={`p-3 rounded-full text-secondary`}>
                    {icon}
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Overview of system statistics and information</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Today's CVs"
                        value={stats.todayCVs}
                        icon={<RiFileList3Line size={24} />}
                        color="border-blue-500"
                        description="CVs created today"
                    />

                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={<FaUsers size={24} />}
                        color="border-green-500"
                        description="Total registered users"
                    />

                    <StatCard
                        title="Received Messages"
                        value={stats.totalMessages}
                        icon={<FaEnvelopeOpenText size={24} />}
                        color="border-purple-500"
                        description="Total messages received"
                    />
                </div>

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent CVs */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Recent CVs</h2>
                            <RiFileList3Line className="text-blue-500" size={20} />
                        </div>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                                </div>
                            ) : recentCVs.length > 0 ? (
                                recentCVs.map((cv, index) => (
                                    <div key={cv._id || index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">
                                                {cv.jobTitle || 'No Job Title'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {cv.firstName} {cv.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(cv.createdAt)}
                                            </p>
                                        </div>
                                        {index === 0 && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">New</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    No CVs found
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Recent Messages</h2>
                            <FaEnvelopeOpenText className="text-purple-500" size={20} />
                        </div>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                                </div>
                            ) : recentMessages.length > 0 ? (
                                recentMessages.map((message, index) => (
                                    <div key={message._id || index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">
                                                {message.name}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                {message.subject}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(message.createdAt)}
                                            </p>
                                        </div>
                                        {!message.read && (
                                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">New</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500">
                                    No messages found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}