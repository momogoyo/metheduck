import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs-extra'
import path from 'path'

const inputDir = path.join(process.cwd(), 'public/images')
const outputDir = path.join(process.cwd(), 'public/small')

// public/small 폴더가 없을 경우 생성
fs.ensureDirSync(outputDir)

// small 이미지 생성
const createSmallImage = (inputPath: string, outputPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoFilter('scale=20:-1') // small 이미지 크기 설정 (가로: 20px / 세로: 비율에 맞게)
      .on('end', resolve)
      .on('error', reject)
      .run()
  })
}

// images 폴더에서 파일 읽어오기
fs.readdir(inputDir, async (error: NodeJS.ErrnoException | null,  files: string[]) => {
  if (error) {
    console.error('/public/images에 있는 파일들을 읽어오지 못했습니다:', error)
    return
  }

  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '-small' + path.extname(file))
    
    try {
      await createSmallImage(inputPath, outputPath)
      console.log(`${file} Small Image 생성`)
    } catch (error) {
      console.log(`Error: ${error}, ${file} Small Image 생성 실패`)
    }
  }

  console.log('모든 Small 이미지 생성 완료')
})
