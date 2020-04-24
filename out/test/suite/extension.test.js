"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
const mocha_1 = require("mocha");
// import * as myExtension from '../extension';
suite('Extension Test Suite', () => {
    mocha_1.before(() => {
        vscode.window.showInformationMessage('Start all tests.');
    });
    test('Sample test', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});
