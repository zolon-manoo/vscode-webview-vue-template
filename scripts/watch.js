const { spawnSync, spawn } = require('child_process')
const process = require('process')

// 定义所有包的信息
const packages = [
  { name: 'libs', path: './packages/libs' },
  { name: 'view', path: './packages/view' },
  { name: 'extension', path: './packages/extension' },
]

console.log('🚀 开始构建和监听流程...\n')

// 第一步：串行编译所有包
console.log('📦 开始串行编译...')
let hasCompileError = false

packages.forEach(pkg => {
  console.log(`\n🔄 编译 ${pkg.name}...`)

  const result = spawnSync('pnpm', ['-F', pkg.path, 'compile'], {
    stdio: 'inherit',
    shell: true,
  })

  if (result.status !== 0) {
    console.error(`❌ ${pkg.name} 编译失败`)
    hasCompileError = true
    return
  }

  console.log(`✅ ${pkg.name} 编译完成`)
})

// 如果有编译失败，则停止
if (hasCompileError) {
  console.error('\n💥 编译过程中出现错误，停止启动监听')
  process.exit(1)
}

console.log('\n🎉 所有包编译完成，开始启动监听...')

// 第二步：并行启动所有watch命令
const watchCommands = packages.map(pkg => ({
  name: pkg.name,
  command: `pnpm -F ${pkg.path} watch`,
}))

// 构建concurrently命令参数
const concurrentArgs = [
  '-n',
  watchCommands.map(cmd => cmd.name).join(','),
  '-c',
  '"green,yellow,blue"',
  '--kill-others-on-fail',
]

const commandStrings = watchCommands.map(cmd => `"${cmd.command}"`)
const fullCommand = `concurrently ${concurrentArgs.join(' ')} ${commandStrings.join(' ')}`

console.log('执行并行监听命令...')
console.log('命令:', fullCommand)

// 启动并发监听进程
const child = spawn('pnpm', ['concurrently', ...concurrentArgs, ...commandStrings], {
  stdio: 'inherit',
  shell: true,
})

child.on('error', error => {
  console.error('❌ 并发监听启动失败:', error.message)
})

child.on('exit', code => {
  console.log(`\n📦 监听进程退出，代码: ${code}`)
})
