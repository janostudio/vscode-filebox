"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    // 注册一个默认的命令
    const disposable = vscode.commands.registerCommand('filebox.helloWorld', () => {
        vscode.window.showInformationMessage('Hello qinghuangniao!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map