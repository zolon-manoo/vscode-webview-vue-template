'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // 1. 提示用户输入信息
  prompting() {
    // 欢迎信息
    this.log(
      yosay(
        `欢迎使用 ${chalk.red('VSCode Webview Vue 模板')} 生成器！\n这个工具将帮助您快速创建一个基于 Vue.js 和 Webview 的 VS Code 插件项目。`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'extensionName',
        message: '请输入插件名称 (例如: my-awesome-extension):',
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return '插件名称不能为空';
          }
          // 验证名称格式：只能包含字母、数字、连字符和下划线
          if (!/^[a-zA-Z0-9][a-zA-Z0-9-_]*$/.test(input)) {
            return '插件名称只能包含字母、数字、连字符和下划线，且不能以连字符或下划线开头';
          }
          return true;
        },
        default: 'my-vscode-extension'
      },
      {
        type: 'input',
        name: 'displayName',
        message: '请输入插件显示名称 (用户看到的名称):',
        default: (props) => props.extensionName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入插件描述:',
        default: '一个基于 Vue.js 和 Webview 的 VS Code 插件'
      },
      {
        type: 'input',
        name: 'authorName',
        message: '请输入作者姓名:',
        default: 'Your Name'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '请输入作者邮箱:',
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return '邮箱不能为空';
          }
          // 简单的邮箱格式验证
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            return '请输入有效的邮箱地址';
          }
          return true;
        },
        default: 'your.email@example.com'
      },
      {
        type: 'input',
        name: 'publisherName',
        message: '请输入发布者名称 (VSCode Marketplace publisher):',
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return '发布者名称不能为空';
          }
          // 发布者名称格式验证
          if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(input)) {
            return '发布者名称只能包含字母、数字和连字符，且不能以连字符开头';
          }
          return true;
        },
        default: 'your-username'
      },
      {
        type: 'input',
        name: 'commandName',
        message: '请输入主要命令名称 (例如: myExtension.helloWorld):',
        validate: (input) => {
          if (!input || input.trim().length === 0) {
            return '命令名称不能为空';
          }
          // 命令名称格式验证：namespace.command
          if (!/^[a-zA-Z][a-zA-Z0-9]*\.[a-zA-Z][a-zA-Z0-9]*$/.test(input)) {
            return '命令名称格式应为：命名空间.命令名 (例如: myExtension.helloWorld)';
          }
          return true;
        },
        default: (props) => `${props.extensionName.replace(/[-_]/g, '')}.helloWorld`
      },
      {
        type: 'input',
        name: 'commandTitle',
        message: '请输入命令显示标题:',
        default: 'Hello World'
      },
      {
        type: 'input',
        name: 'webviewTitle',
        message: '请输入 Webview 侧边栏标题:',
        default: (props) => props.displayName
      },
      {
        type: 'list',
        name: 'language',
        message: '请选择默认语言:',
        choices: [
          { name: 'English', value: 'en' },
          { name: '中文 (Chinese)', value: 'zh' },
          { name: '日本語 (Japanese)', value: 'ja' },
          { name: 'Français (French)', value: 'fr' }
        ],
        default: 'en'
      },
      {
        type: 'confirm',
        name: 'enableGit',
        message: '是否初始化 Git 仓库?',
        default: true
      },
      {
        type: 'confirm',
        name: 'installDependencies',
        message: '是否在项目创建完成后自动安装依赖?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // 保存用户输入
      this.props = props;
      
      // 处理和组织数据
      this.props.extensionId = this.props.extensionName;
      this.props.viewId = `${this.props.extensionName.replace(/[-_]/g, '-')}-sidebar`;
      this.props.packageName = this.props.extensionName;
      this.props.packageNameCamelCase = this.props.extensionName.replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, c => c.toUpperCase());
      
      this.log('\n' + chalk.green('✅ 所有信息收集完成！'));
      this.log(chalk.blue('📝 插件配置:'));
      this.log(`   - 插件名称: ${this.props.extensionName}`);
      this.log(`   - 显示名称: ${this.props.displayName}`);
      this.log(`   - 作者: ${this.props.authorName} <${this.props.authorEmail}>`);
      this.log(`   - 发布者: ${this.props.publisherName}`);
      this.log(`   - 命令: ${this.props.commandName}`);
      this.log(`   - 默认语言: ${this.props.language}`);
    });
  }

  // 2. 生成文件
  writing() {
    const templateData = {
      // 插件基本信息
      extensionName: this.props.extensionName,
      displayName: this.props.displayName,
      description: this.props.description,
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail,
      publisherName: this.props.publisherName,
      commandName: this.props.commandName,
      commandTitle: this.props.commandTitle,
      webviewTitle: this.props.webviewTitle,
      language: this.props.language,
      
      // 生成的标识符
      extensionId: this.props.extensionId,
      viewId: this.props.viewId,
      packageName: this.props.packageName,
      packageNameCamelCase: this.props.packageNameCamelCase,
      
      // 当前时间
      currentYear: new Date().getFullYear(),
    };

    // 复制和渲染所有模板文件
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { process: (content) => this._processPackageJson(content, templateData) }
    );

    // 生成主 package.json
    this.fs.copy(
      this.templatePath('packages/extension/package.json'),
      this.destinationPath('packages/extension/package.json'),
      { process: (content) => this._processExtensionPackageJson(content, templateData) }
    );

    // 生成 view package.json
    this.fs.copy(
      this.templatePath('packages/view/package.json'),
      this.destinationPath('packages/view/package.json'),
      { process: (content) => this._processViewPackageJson(content, templateData) }
    );

    // 生成 libs package.json
    this.fs.copy(
      this.templatePath('packages/libs/package.json'),
      this.destinationPath('packages/libs/package.json'),
      { process: (content) => this._processLibsPackageJson(content, templateData) }
    );

    // 复制其他文件
    this.fs.copy(
      this.templatePath('pnpm-workspace.yaml'),
      this.destinationPath('pnpm-workspace.yaml')
    );

    this.fs.copy(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );

    this.fs.copy(
      this.templatePath('.prettierrc.json'),
      this.destinationPath('.prettierrc.json')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.vscodeignore'),
      this.destinationPath('.vscodeignore')
    );

    // 复制脚本文件
    this.fs.copy(
      this.templatePath('scripts'),
      this.destinationPath('scripts')
    );

    // 复制 TypeScript 配置文件
    this._copyTsConfigs(templateData);

    // 复制源码文件并处理
    this._copySourceFiles(templateData);

    // 复制文档文件
    this._copyDocs(templateData);
  }

  // 3. 安装依赖
  install() {
    if (this.props.installDependencies) {
      this.log('\n' + chalk.blue('📦 开始安装依赖...'));
      this.npmInstall();
    }
  }

  // 4. 初始化 Git
  end() {
    if (this.props.enableGit) {
      this.log('\n' + chalk.blue('🔧 初始化 Git 仓库...'));
      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['add', '.']);
      this.spawnCommandSync('git', ['commit', '-m', '🎉 Initial commit: VSCode Webview Vue extension']);
    }

    this.log('\n' + chalk.green('🎉 项目创建完成！'));
    this.log(chalk.blue('\n📖 快速开始:'));
    this.log(`   1. 进入项目目录: ${chalk.yellow(`cd ${this.props.extensionName}`)}`);
    this.log(`   2. 启动开发模式: ${chalk.yellow('pnpm run watch')}`);
    this.log(`   3. 在 VS Code 中按 F5 开始调试`);
    this.log(`   4. 构建插件包: ${chalk.yellow('pnpm run package')}`);
    this.log('\n' + chalk.cyan('💡 提示: 查看 README.md 文件了解更多信息'));
  }

  // 处理主 package.json
  _processPackageJson(content, data) {
    const packageJson = JSON.parse(content.toString());
    
    packageJson.name = data.extensionName;
    packageJson.description = data.description;
    packageJson.author = data.authorName;
    
    return JSON.stringify(packageJson, null, 2);
  }

  // 处理扩展 package.json
  _processExtensionPackageJson(content, data) {
    const packageJson = JSON.parse(content.toString());
    
    packageJson.name = data.packageName;
    packageJson.publisher = data.publisherName;
    packageJson.description = data.description;
    
    // 更新命令配置
    if (packageJson.contributes && packageJson.contributes.commands) {
      packageJson.contributes.commands[0].command = data.commandName;
      packageJson.contributes.commands[0].title = data.commandTitle;
    }
    
    // 更新视图配置
    if (packageJson.contributes && packageJson.contributes.views) {
      Object.keys(packageJson.contributes.views).forEach(key => {
        if (packageJson.contributes.views[key][0]) {
          packageJson.contributes.views[key][0].name = data.webviewTitle;
          if (packageJson.contributes.views[key][0].contextualTitle) {
            packageJson.contributes.views[key][0].contextualTitle = data.webviewTitle;
          }
        }
      });
    }
    
    // 更新视图容器配置
    if (packageJson.contributes && packageJson.contributes.viewsContainers) {
      Object.keys(packageJson.contributes.viewsContainers).forEach(key => {
        if (packageJson.contributes.viewsContainers[key][0]) {
          packageJson.contributes.viewsContainers[key][0].title = data.webviewTitle;
        }
      });
    }
    
    return JSON.stringify(packageJson, null, 2);
  }

  // 处理视图 package.json
  _processViewPackageJson(content, data) {
    const packageJson = JSON.parse(content.toString());
    
    const packageName = `@${data.extensionName}/view`;
    packageJson.name = packageName;
    packageJson.author = data.authorName;
    
    return JSON.stringify(packageJson, null, 2);
  }

  // 处理库 package.json
  _processLibsPackageJson(content, data) {
    const packageJson = JSON.parse(content.toString());
    
    const packageName = `@${data.extensionName}/libs`;
    packageJson.name = packageName;
    packageJson.author = data.authorName;
    
    return JSON.stringify(packageJson, null, 2);
  }

  // 复制 TypeScript 配置文件
  _copyTsConfigs(data) {
    const configs = [
      'packages/extension/tsconfig.json',
      'packages/libs/tsconfig.json',
      'packages/libs/tsconfig.cjs.json',
      'packages/view/tsconfig.json'
    ];
    
    configs.forEach(configPath => {
      this.fs.copy(
        this.templatePath(configPath),
        this.destinationPath(configPath)
      );
    });
  }

  // 复制源码文件
  _copySourceFiles(data) {
    const sourceFiles = [
      'packages/extension/src/extension.ts',
      'packages/extension/src/BaseViewProvider.ts',
      'packages/libs/src/index.ts',
      'packages/libs/src/messenger.ts',
      'packages/view/src/App.vue',
      'packages/view/src/index.ts',
      'packages/view/src/index.css'
    ];
    
    sourceFiles.forEach(filePath => {
      if (this.fs.exists(this.templatePath(filePath))) {
        this.fs.copy(
          this.templatePath(filePath),
          this.destinationPath(filePath),
          { process: (content) => this._processSourceFile(content, data) }
        );
      }
    });
    
    // 复制资源文件
    this.fs.copy(
      this.templatePath('packages/extension/resources'),
      this.destinationPath('packages/extension/resources')
    );
    
    // 复制 locales
    this.fs.copy(
      this.templatePath('packages/libs/src/locales'),
      this.destinationPath('packages/libs/src/locales')
    );
    
    // 复制工具文件
    this.fs.copy(
      this.templatePath('packages/extension/src/utils'),
      this.destinationPath('packages/extension/src/utils')
    );
    
    // 复制配置文件
    this.fs.copy(
      this.templatePath('packages/view/vite.config.ts'),
      this.destinationPath('packages/view/vite.config.ts')
    );
    
    this.fs.copy(
      this.templatePath('packages/view/tailwind.config.js'),
      this.destinationPath('packages/view/tailwind.config.js')
    );
    
    this.fs.copy(
      this.templatePath('packages/view/postcss.config.js'),
      this.destinationPath('packages/view/postcss.config.js')
    );
  }

  // 处理源码文件中的模板变量
  _processSourceFile(content, data) {
    let processedContent = content.toString();
    
    // 替换模板变量
    const replacements = {
      '<%= extensionName %>': data.extensionName,
      '<%= displayName %>': data.displayName,
      '<%= description %>': data.description,
      '<%= authorName %>': data.authorName,
      '<%= authorEmail %>': data.authorEmail,
      '<%= publisherName %>': data.publisherName,
      '<%= commandName %>': data.commandName,
      '<%= commandTitle %>': data.commandTitle,
      '<%= webviewTitle %>': data.webviewTitle,
      '<%= viewId %>': data.viewId,
      '<%= language %>': data.language,
      '<%= currentYear %>': data.currentYear,
      '<%= packageName %>': data.packageName,
      '<%= packageNameCamelCase %>': data.packageNameCamelCase
    };
    
    // 执行所有替换
    Object.keys(replacements).forEach(template => {
      const value = replacements[template];
      processedContent = processedContent.split(template).join(value);
    });
    
    return processedContent;
  }

  // 复制文档文件
  _copyDocs(data) {
    this.fs.copy(
      this.templatePath('vsc-extension-quickstart.md'),
      this.destinationPath('vsc-extension-quickstart.md')
    );
    
    this.fs.copy(
      this.templatePath('ARCHITECTURE.md'),
      this.destinationPath('ARCHITECTURE.md')
    );
    
    // 处理README文件
    if (this.fs.exists(this.templatePath('packages/README.md'))) {
      this.fs.copy(
        this.templatePath('packages/README.md'),
        this.destinationPath('packages/README.md'),
        { process: (content) => this._processSourceFile(content, data) }
      );
    }
  }
};