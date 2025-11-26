import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('photo');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // ایجاد نام فایل منحصر به فرد
        const timestamp = Date.now();
        const originalName = file.name;
        const fileExtension = path.extname(originalName);
        const fileName = `cv_photo_${timestamp}${fileExtension}`;

        // مسیر ذخیره سازی
        const publicDir = path.join(process.cwd(), 'public', 'cv');
        const filePath = path.join(publicDir, fileName);

        // اطمینان از وجود پوشه
        const fs = require('fs');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        // ذخیره فایل
        await writeFile(filePath, buffer);

        // آدرس نسبی فایل
        const fileUrl = `/cv/${fileName}`;

        return NextResponse.json({
            success: true,
            fileUrl: fileUrl
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}