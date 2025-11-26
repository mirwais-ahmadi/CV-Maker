'use client'

import { useEffect, useState, useRef } from 'react'

export default function useAutoSave({ cvId, formData }) {
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState(null)
    const timeoutRef = useRef(null)

    // تابع برای ذخیره مستقیم (مثلاً هنگام تغییر مرحله)
    const saveNow = async () => {
        if (!cvId) return
        setSaving(true)

        try {
            const res = await fetch('/api/cv/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cvId, formData }),
            })

            const data = await res.json()
            if (res.ok) {
                setLastSaved(new Date().toLocaleTimeString())
            } else {
                console.error(data.error || 'Failed to save CV')
            }
        } catch (error) {
            console.error('Save error:', error)
        } finally {
            setSaving(false)
        }
    }

    // ذخیره خودکار وقتی formData تغییر کند
    useEffect(() => {
        if (!cvId) return

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            saveNow()
        }, 3000) // بعد از ۳ ثانیه سکوت ذخیره کند

        return () => clearTimeout(timeoutRef.current)
    }, [formData])

    return { saving, saveNow, lastSaved }
}
