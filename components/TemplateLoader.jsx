'use client'

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"

export default function TemplateLoader({ slug, data, allowed = [] }) {
    const [error, setError] = useState(null)

    const isAllowed = useMemo(() => allowed.includes(slug), [slug, allowed])

    const DynamicComp = useMemo(() => {
        if (!isAllowed || !slug) return null

        return dynamic(
            () => import(`@/components/templates/${slug}.jsx`).then((m) => m.default),
            { ssr: false, loading: () => <div className="p-6">Loading template...</div> }
        )
    }, [slug, isAllowed])

    useEffect(() => {
        setError(null)
    }, [slug])

    if (!slug) return <div className="p-6 text-center text-gray-500">No template selected</div>
    if (!isAllowed) return <div className="p-6 text-red-500">Invalid template</div>
    if (!DynamicComp) return <div className="p-6">Preparing template...</div>

    try {
        const Comp = DynamicComp
        return <Comp data={data} />
    } catch (err) {
        console.error("Template load error:", err)
        return <div className="p-6 text-red-500">Failed to load template</div>
    }
}
