import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "filebox" is now active!');

	let disposable = vscode.commands.registerCommand('filebox.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from filebox1!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
