import * as fs from 'fs';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

export interface FileStats {
    ctime: Date;
    mtime: Date;
}

export default function monitorFile(filePath: string, monitorInterval: number) {
    let initialStats = fs.statSync(filePath);
    let stat$ = Observable.bindNodeCallback(fs.stat);
    return Observable.interval(monitorInterval)
        .flatMap < fs.Stats > (_ => stat$(filePath))
        .filter(stats => stats.ctime > initialStats.ctime || stats.mtime > initialStats.mtime)
        .take(1);
}