import * as vscode from 'vscode';
import TimerManager from "./timer-manager";

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("filebox");
	const timerManager = new TimerManager(config.workTime, config.pauseTime);

	const startDisposable = vscode.commands.registerCommand("filebox.startTimer", () => {
		timerManager.start();
	});

	const stopDisposable = vscode.commands.registerCommand("filebox.pauseTimer", () => {
		timerManager.pause();
	});

	const resetDisposable = vscode.commands.registerCommand("filebox.resetTimer", () => {
		timerManager.reset();
	});

	context.subscriptions.push(timerManager, startDisposable, stopDisposable, resetDisposable);
}

export function deactivate() {}
