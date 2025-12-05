import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function copyRecursiveSync(src, dest) {
  try {
    // 复制JS文件
    if (existsSync(src)) {
      const files = readdirSync(src)
      files.forEach(file => {
        try {
          const source = join(src, file)
          const target = join(dest, file)
          
          // 检查源文件类型
          const sourceStat = statSync(source)
          
          if (sourceStat.isDirectory()) {
            // 如果是目录，递归复制
            copyRecursiveSync(source, target)
          } else {
            // 如果是文件，确保目标目录存在，然后复制
            const targetDir = dirname(target)
            if (!existsSync(targetDir)) {
              mkdirSync(targetDir, { recursive: true })
            }
            copyFileSync(source, target)
          }
        } catch (error) {
          console.error(`❌ 复制文件失败: ${file}`, error.message)
          throw error
        }
      })
    } else {
      console.warn(`⚠️  源目录不存在: ${src}`)
    }
  } catch (error) {
    console.error(`❌ 复制过程失败: ${src} -> ${dest}`, error.message)
    throw error
  }
}

const modules = ['view', 'libs']

modules.forEach(module => {
  const src = join(__dirname, `../packages/${module}/dist`)
  const dest = join(__dirname, `../packages/extension/dist/${module}`)
  copyRecursiveSync(src, dest)
  console.log(`📋 ${module} 资源复制完成`)
})

console.log('✅ 资源复制完成')
