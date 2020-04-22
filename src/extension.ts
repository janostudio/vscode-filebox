import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// 注册一个默认的命令
	const disposable = vscode.commands.registerCommand('filebox.helloWorld', () => {
		vscode.window.showInformationMessage('Hello qinghuangniao!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
