# VSCode Tabular Music Formatter

## Symbols

- `||` - Bar
- `|` - Bit
- `'` - Upper octave
- `,` - Lower octave
- `~` - Bekar (un-sharp)
- `#` - Sharp
- `b` - Flat
- `-` - Extend previous note

## Example

Only lines starting with `|` will be formatted:

```text
||      A      B'  (  C  D ) |  -  A,  E#  : ||    |    |
||      A      B       G     |  C  A   F   : ||  A |  B |
||
||         {f_<_fff}         |               ||    |    |

Eisoteric example:
||  C4..(chromatic)..G |  1..(dim)..5  (  +5 )  (  -2 ) |  C4..G  (  +5 )  (  -2 ) |
||          G          |                G               |             G            |
```

## Usage

1. Select the text you want to format.
2. Run the `Music Tabulator: Format Selection` command from the Command Palette (`Ctrl+Shift+P`).
3. The selected text will be formatted according to the symbols defined above.

## Installation

1. Open VSCode.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for "Tabular Music Formatter".
4. Click "Install".

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/shemeshg/tabular-music-formatter).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
\```

Feel free to copy and paste this into your README file! Let me know if you need any further assistance.