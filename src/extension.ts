'use strict';
import {
    workspace,
    window,
    commands,
    ExtensionContext,
    Disposable
} from 'vscode';
import
MonitoredFileProvider, {
    encodeUri
}
from './monitoredFileProvider';

function aksAboutMonitorInterval() {
    return window.showInputBox();
}

export function activate(context: ExtensionContext) {
    const provider = new MonitoredFileProvider();
    const providerRegistrations = Disposable.from(
        workspace.registerTextDocumentContentProvider(MonitoredFileProvider.scheme, provider)
    );
    let monitorFileCommand = commands.registerCommand('extension.monitorFile', () => {
        monitorFile();
    });
    let monitorFileCustomCommand = commands.registerCommand('extension.monitorFileCustom', () => {
        window.showInputBox({
            ignoreFocusOut: true,
            prompt: 'Provide file checks interval (ms).',
            placeHolder: '500 ms',
            validateInput: (input) => isNaN(+input) ? 'Please provide a number' : null,
            value: '500',
        }).then((input) => {
            monitorFile(+input);
        });
    });

    context.subscriptions.push(monitorFileCommand, monitorFileCustomCommand, providerRegistrations);
}

export function monitorFile(monitorInterval: number = 500) {
    let editor = window.activeTextEditor;
    let uri = encodeUri(window.activeTextEditor.document.uri, monitorInterval);
    return workspace.openTextDocument(uri).then(doc => {
        commands.executeCommand('workbench.action.closeActiveEditor');
        window.showTextDocument(doc, editor.viewColumn)
    }, err => {
        window.showErrorMessage(err);
    });
}

export function deactivate() {}