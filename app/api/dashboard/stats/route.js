import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Cv from '@/models/Cv'
import User from '@/models/User'
import Message from '@/models/Message'

export async function GET() {
    try {
        await dbConnect()

        // Today's date
        const today = new Date()
        const startOfToday = new Date(today.setHours(0, 0, 0, 0))
        const endOfToday = new Date(today.setHours(23, 59, 59, 999))

        // Count today's CVs
        const todayCVs = await Cv.countDocuments({
            createdAt: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        })

        // Count total users
        const totalUsers = await User.countDocuments()

        // Count total messages
        const totalMessages = await Message.countDocuments()

        // Get recent CVs (last 5)
        const recentCVs = await Cv.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('jobTitle firstName lastName createdAt')

        // Get recent messages (last 5)
        const recentMessages = await Message.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email subject read createdAt')

        return NextResponse.json({
            stats: {
                todayCVs,
                totalUsers,
                totalMessages
            },
            recentCVs,
            recentMessages
        })

    } catch (error) {
        console.error('Dashboard stats error:', error)
        return NextResponse.json(
            { error: 'Error fetching dashboard stats' },
            { status: 500 }
        )
    }
}