"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const timer_manager_1 = require("./timer-manager");
function activate(context) {
    const config = vscode.workspace.getConfiguration("filebox");
    const timerManager = new timer_manager_1.default(config.workTime, config.pauseTime);
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
