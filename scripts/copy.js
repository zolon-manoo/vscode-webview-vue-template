const fs = require('fs')
const path = require('path')

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  // 复制JS文件
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src)
    files.forEach(file => {
      const source = path.join(src, file)
      const target = path.join(dest, file)
      fs.copyFileSync(source, target)
    })
  }
}

const modules = ['view', 'libs']

modules.forEach(module => {
  const src = path.join(__dirname, `../packages/${module}/dist`)
  const dest = path.join(__dirname, `../packages/extension/dist/${module}`)
  copyRecursiveSync(src, dest)
  console.log(`📋 {module} 资源复制完成`)
})

console.log('✅ 资源复制完成')
