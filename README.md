# VSCode Music Tabular Formatter

## Symbols

- `||` - Bar
- `|` - Bit
- `'` - Upper octave
- `,` - Lower octave
- `~` - Bekar (un-sharp)
- `#` - Sharp
- `b` - Flat
- `-` - Extend previous note
- `;` - Silence

## Example

Only lines starting with `|` will be formatted:

```text
||      A      B'  (  C  D ) |  -  A,  E#  ; ||    |    ||
||      A      B       G     |  C  A   F   ; ||  A |  B ||
// remarks part of block  
||         {f_<_fff}         |               ||    |    ||

Eisoteric example:
||  C4..(chromatic)..G |  1..(dim)..5  (  +5 )  (  -2 ) |  C4..G  (  +5 )  (  -2 ) ||
||          G          |                G               |             G            ||

||  1   2  3  4   2   3  1 |  5   1'  7,  1'  2 |
||
||  5,  6  7  1'  6,  7  5 |  1'  5   4   5   3 |
```

## Usage

1. Select the text you want to format.
2. Run the `Music Tabulator: Format Selection` command from the Command Palette (`Ctrl+Shift+P`).
3. The selected text will be formatted according to the symbols defined above.

## Installation

1. Open VSCode.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
2. Drag the the `music-tabular-formatter-0.0.1.vsix` to the left pan
3. Search for "Tabular Music Formatter".
4. Ensure it is "Installed".

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/shemeshg/music-tabular-formatter).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/shemeshg/music-tabular-formatter/blob/main/LICENSE) file for details.


Feel free to copy and paste this into your README file! Let me know if you need any further assistance.