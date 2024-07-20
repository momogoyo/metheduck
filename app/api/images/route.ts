import {
  NextRequest,
  NextResponse
} from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)

  const imagesDir = path.join(process.cwd(), 'public', 'images')
  const fileNames = fs.readdirSync(imagesDir)
  const imageFiles = fileNames.filter((file) => /\.(png|jpg|PNG|JPG|jpeg|gif|svg)$/.test(file))
  const images = imageFiles.map((fileName, index) => {
    return {
      id: index,
      url: `/compress/${fileName}`,
      title: fileName
    }
  })

  const totalImages = images.length
  const totalPages = Math.ceil(totalImages / pageSize)

  if (page < 1 || page > totalPages) {
    return NextResponse.json({
      error: 'Invalid page number'
    }, {
      status: 400
    })
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedImages = images.slice(start, end)

  return NextResponse.json({
    images: paginatedImages, 
    page,
    totalPages,
    totalImages
  })
}