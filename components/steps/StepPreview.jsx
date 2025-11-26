'use client'
import {useRef, useEffect, useState} from "react"

export default function StepPreview({formData}) {
    const previewRef = useRef(null)
    const [TemplateComponent, setTemplateComponent] = useState(null)

    useEffect(() => {
        if (formData.template) {
            import(`@/components/templates/${formData.template}.jsx`)
                .then((mod) => setTemplateComponent(() => mod.default))
                .catch((err) => {
                    console.error("Template load error:", err)
                    setTemplateComponent(null)
                })
        } else {
            setTemplateComponent(null)
        }
    }, [formData.template])

    const handleDownloadPDF = () => {
        if (!previewRef.current) return

        // 1. Create a hidden iframe
        const iframe = document.createElement('iframe')
        iframe.style.position = 'absolute'
        iframe.style.width = '0'
        iframe.style.height = '0'
        iframe.style.border = 'none'
        document.body.appendChild(iframe)

        // 2. Get the iframe's document and write the basic HTML structure
        const printDocument = iframe.contentWindow.document
        printDocument.open()
        printDocument.write(`
      <html lang="en">
        <head>
          <title>${formData.firstName || 'Resume'}</title>
        </head>
        <body>
        </body>
      </html>
    `)
        printDocument.close()

        // 3. Clone all style and link tags from the main document's head to the iframe's head
        const head = document.querySelector('head')
        if (head) {
            const styles = head.querySelectorAll('style, link[rel="stylesheet"]')
            styles.forEach((style) => {
                printDocument.head.appendChild(style.cloneNode(true))
            })
        }

        // 4. Copy the resume content into the iframe's body
        const resumeContent = previewRef.current.innerHTML
        const printBody = printDocument.body
        printBody.innerHTML = resumeContent

        // 5. Apply necessary print styles to the iframe body
        printBody.style.margin = '0'
        printBody.style.padding = '0'
        printBody.style.width = '210mm'
        printBody.style.minHeight = '297mm'

        // Add @page rule for A4 size and no margins
        const pageStyle = printDocument.createElement('style');
        pageStyle.innerHTML = `
            @page {
                size: A4;
                margin: 0;
            }
            @media print {
                html, body {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
        `;
        printDocument.head.appendChild(pageStyle);


        // 6. Trigger the print dialog and clean up
        // We use a short timeout to ensure the content and styles are fully rendered
        // before printing, especially for complex layouts or web fonts.
        setTimeout(() => {
            iframe.contentWindow.focus()
            iframe.contentWindow.print()

            // Remove the iframe after a delay to avoid issues with the print dialog closing prematurely.
            setTimeout(() => {
                document.body.removeChild(iframe)
            }, 1000)
        }, 500) // A 500ms delay is generally safe for rendering.
    }

    if (!TemplateComponent) {
        return (
            <div className="text-center text-gray-500 py-10">
                Please select a template
            </div>
        )
    }

    return (
        <div className="w-full">
            <div ref={previewRef} className="border rounded-lg border-lighter overflow-hidden">
                <TemplateComponent formData={formData}/>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleDownloadPDF}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Download PDF
                </button>
            </div>
        </div>
    )
}