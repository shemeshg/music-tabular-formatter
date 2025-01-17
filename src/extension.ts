// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatMusicDoc } from './musicFormat';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "music-tabular-formatter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('music-tabular-formatter.formatSelected', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from Music Tabular Formatter!');


		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			let text = selection.isEmpty ? document.getText() : document.getText(selection);
			let formattedText = formatMusicDoc(text);
			editor.edit(editBuilder => {
				if (selection.isEmpty) {
					let fullRange = new vscode.Range(
						document.positionAt(0),
						document.positionAt(document.getText().length)
					);
					editBuilder.replace(fullRange, formattedText);
				} else {
					editBuilder.replace(selection, formattedText);
				}
			});
		}
		


	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
