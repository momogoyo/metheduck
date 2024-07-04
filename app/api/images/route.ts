import {
  NextRequest,
  NextResponse
} from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET (request: NextRequest) {
  const imagesDir = path.join(process.cwd(), 'public', 'images')
  const fileNames = fs.readdirSync(imagesDir)
  const imageFiles = fileNames.filter((file) => /\.(png|jpg|PNG|JPG|jpeg|gif|svg)$/.test(file))
  const images = imageFiles.map((fileName) => `/images/${fileName}`)
  
  return NextResponse.json(images)
}

