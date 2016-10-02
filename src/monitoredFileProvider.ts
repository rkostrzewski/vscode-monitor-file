import * as vscode from 'vscode';
import * as fs from 'fs';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/toPromise';
import fileMonitor from './fileMonitor';

export default class MonitoredFileProvider implements vscode.TextDocumentContentProvider {
    static scheme = 'monitor';

    private _onDidChange = new vscode.EventEmitter < vscode.Uri > ();

    get onDidChange() {
        return this._onDidChange.event;
    }

    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken) {
        let monitorInterval: number = +uri.query;
        fileMonitor(uri.fsPath, monitorInterval).subscribe(_ => this._onDidChange.fire(uri));
        let readFile$: any = Observable.bindNodeCallback(fs.readFile);
        return readFile$(uri.fsPath, 'utf-8').toPromise();
    }
}

export function encodeUri(uri: vscode.Uri, monitorInterval: number): vscode.Uri {
    return vscode.Uri
        .parse(`${MonitoredFileProvider.scheme}:${uri.path}?${monitorInterval}`);
}