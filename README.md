[![Latest Release](https://vsmarketplacebadge.apphb.com/version-short/rkostrzewski.monitor-file.svg)](https://marketplace.visualstudio.com/items?itemName=rkostrzewski.monitor-file) [![Installs](https://vsmarketplacebadge.apphb.com/installs/rkostrzewski.monitor-file.svg)](https://marketplace.visualstudio.com/items?itemName=rkostrzewski.monitor-file) [![Build Status](https://travis-ci.org/rkostrzewski/vscode-monitor-file.svg)](https://travis-ci.org/rkostrzewski/vscode-monitor-file) [![Dependency Status](https://david-dm.org/rkostrzewski/vscode-monitor-file/status.svg)](https://david-dm.org/rkostrzewski/vscode-monitor-file)

# Monitor File

## Synposis

Visual Studio Code extension allowing you to monitor file using custom interval.
Just fire the extension and your file will be opened in new read-only window and will be updated when changes to file occur.

## Installation

Just press `F1`, type `ext install monitor-file` and voilà!
You can also install it from VS Code's UI.

## Usage

Available commands:
- `Monitor File` - monitors file using default 500ms interval,
- `Monitor File: Custom interval` - monitors file using provided interval (in ms).

Open the file that you want to monitor, bring up command palette (`CTRL+SHIFT+P`) and type in one of commands. 

## Why

Visual Studio code automatically reloads opened file when changes occur.
However it seems not to be the case when using log4net on Windows. Furthermore, opened files can be changed in editor by accident disabling auto reload.

This extension tackles that problem.  
