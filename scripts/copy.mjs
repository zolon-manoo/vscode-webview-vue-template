import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs'
import { join, dirname } from 'path'

function copyRecursiveSync(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }

  // 复制JS文件
  if (existsSync(src)) {
    const files = readdirSync(src)
    files.forEach(file => {
      const source = join(src, file)
      const target = join(dest, file)
      copyFileSync(source, target)
    })
  }
}

const modules = ['view', 'libs']

modules.forEach(module => {
  const src = join(dirname(), `../packages/${module}/dist`)
  const dest = join(dirname(), `../packages/extension/dist/${module}`)
  copyRecursiveSync(src, dest)
  console.log(`📋 {module} 资源复制完成`)
})

console.log('✅ 资源复制完成')
