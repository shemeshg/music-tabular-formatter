# VSCode Music Tabular Formatter

## Symbols

- `||` - Bar
- `|` - Bit
- `( ` ` )`  - Group notes, parentheses must followed by space to group.

- `'` - Upper octave
- `,` - Lower octave
- `~` - Bekar (un-sharp)
- `#` - Sharp
- `b` - Flat
- `-` - Extend previous note
- `.` - Play previous note
- `;` - Silence


## Example

Only lines starting with `|` will be formatted:

```text
||      A      B'  (  C  D ) |  -  A,  E#  ; ||    |          ||
||      A      B       G     |  C  A   F   ; ||  A |  B  .  . ||
// remarks part of block  
||         {f_<_fff}         |               ||    |          ||

Eisoteric example:
||  C4..(chromatic)..G |  1..(dim)..5  (  +5 )  (  -2 ) |  C4..G  (  +5 )  (  -2 ) ||
||          G          |                G               |             G            ||

||  1   2  3  4   2   3  1 |  5   1'  7,  1'  2 |
||
||  5,  6  7  1'  6,  7  5 |  1'  5   4   5   3 |
```
```
X:1
T:Title
C: Composer
M:C
Q:1/4=76
%%score (T1 ) (B1 )
V:T1           clef=treble-8  
V:B1  clef=bass     octave=-2
K:Gm
%            End of header, start of tune body:
% 1
// [V:T1] 
|  (B2c2 d2g2) |     f6e2    |    (d2c2  d2)  e2   |  d4  c2z2 |
// [V:B1] 
|      z8      |  z2f2  g2a2 |     b2z2     z2  e2 |  f4  f2z2 |
% 5
// [V:T1]  
|  (B2c2 d2g2)  |  f8  |  d3c  (d2fe) |   H    d6 ||
//[V:B1]  
|  (d2f2 b2e'2) |  d'8 |  g3g    g4   |    H^f6   ||
```

```
X:1
T:Title
C: Composer
M:C
Q:1/4=76
V:T1           clef=treble-8  
K:C
// [V:T1] 
|  a  b  c |  de  fg ||
%
// [V:T1] 
|  a  a  a  a |  aaaa  aaaa |
%
// [V:T1 octave=-1] 
|  A  a  a'  a'' |
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