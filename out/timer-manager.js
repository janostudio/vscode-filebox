"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
var TimerStatus;
(function (TimerStatus) {
    TimerStatus[TimerStatus["None"] = 0] = "None";
    TimerStatus[TimerStatus["Work"] = 1] = "Work";
    TimerStatus[TimerStatus["Idle"] = 2] = "Idle";
    TimerStatus[TimerStatus["Pause"] = 3] = "Pause";
    TimerStatus[TimerStatus["Done"] = 4] = "Done";
})(TimerStatus || (TimerStatus = {}));
// 一轮结束显示done，点击开始新的一轮
// 默认为start，点击开始新一轮
// pause表示暂停当前的工作
// idle表示目前处于休息阶段
// work表示目前处于工作阶段
// 流程：start (- wrok [- pause] - idle) * 4 - done
// start/done + text
// work/idle/pause + 25:00 + reset
const timerStatusOptions = [{
        text: '🍅 $(triangle-right)',
        command: 'filebox.startTimer',
        tooltip: 'Start Timer',
        showReset: false
    }, {
        command: 'filebox.pauseTimer',
        tooltip: 'Pause Timer',
        showReset: true
    }, {
        command: 'filebox.pauseTimer',
        tooltip: 'Pause Timer',
        showReset: true
    }, {
        text: '⏸️ paused',
        command: 'filebox.startTimer',
        tooltip: 'Resume Timer',
        showReset: true
    }, {
        text: '🍅 sucess',
        command: 'filebox.resetTimer',
        tooltip: 'Restart Timer',
        showReset: false
    }];
class timerManager {
    constructor(workTime = 25, idleTime = 5, round = 4) {
        this.workTime = workTime;
        this.idleTime = idleTime;
        this.round = round;
        // 初始化状态
        this._currentTimerStatus = TimerStatus.None;
        this._timerId = null;
        // 初始化时间参数
        this._currentTime = this.workTime * 60;
        this._currentRound = this.round - 1;
        // 初始化重置按钮
        this._resetButton = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._resetButton.text = '🧄 reset';
        this._resetButton.command = 'filebox.resetTimer';
        this._resetButton.tooltip = 'Reset Timer';
        // 初始化主要按钮
        this._mainButton = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this._hanldeMainButton(TimerStatus.None);
        this._mainButton.show();
    }
    /**
     * 根据状态设置按钮文字与功能
     * @param status
     */
    _hanldeMainButton(status) {
        this._currentTimerStatus = status;
        const statusOptions = timerStatusOptions[status];
        if (statusOptions.text)
            this._mainButton.text = statusOptions.text;
        this._mainButton.command = statusOptions.command;
        this._mainButton.tooltip = statusOptions.tooltip;
        if (statusOptions.showReset) {
            this._resetButton.show();
        }
        else if (this._resetButton) {
            this._resetButton.hide();
        }
    }
    /**
     * 启动计时
     */
    timeTick() {
        if (this._timerId)
            clearInterval(this._timerId);
        this._currentRound = this.round - 1;
        this._timerId = setInterval(() => {
            if (this._currentTime === 0) {
                switch (this._currentTimerStatus) {
                    case 1:
                        this._currentTimerStatus = TimerStatus.Idle;
                        this._currentTime = this.idleTime * 60;
                        break;
                    case 2:
                        if (this._currentRound === 0) {
                            this._timerId && clearInterval(this._timerId);
                            this._hanldeMainButton(TimerStatus.Done);
                        }
                        else {
                            this._currentRound -= 1;
                            this._currentTime = this.workTime * 60;
                        }
                        break;
                }
            }
            else {
                this._currentTime -= 1;
                this._mainButton.text = `${this.round - this._currentRound}/${this.round} ${this._currentTimerStatus === 1 ? 'work' : 'idle'} ${Math.floor(this._currentTime / 60)}:${this._currentTime % 60}`;
            }
        }, 1000);
    }
    /**
     * 启动计时
     */
    start() {
        if (this._currentTimerStatus !== TimerStatus.Pause)
            this._currentTime = this.workTime * 60;
        this._hanldeMainButton(TimerStatus.Work);
        this.timeTick();
    }
    /**
     * 暂停计时
     */
    pause() {
        this._timerId && clearInterval(this._timerId);
        this._hanldeMainButton(TimerStatus.Pause);
    }
    /**
     * 重启计时
     */
    reset() {
        this._timerId && clearInterval(this._timerId);
        this._hanldeMainButton(TimerStatus.None);
    }
    // Dispose 模式主要用来资源管理，资源比如内存被对象占用，则会通过调用方法来释放，这些方法通常被命名为‘close’，‘dispose’，‘free’，‘release’。
    // 当扩展禁用时会调用 dispose()方法
    dispose() {
        this._hanldeMainButton(TimerStatus.None);
        this._mainButton.dispose();
        this._resetButton.dispose();
    }
}
exports.default = timerManager;
