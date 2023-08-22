<div align="center">
	<h1>Parser for &lttable&gt to JSON</h1>
	<p>
		<b>A simple and easy to use parser for HTML table to JSON
	</p>
	<br>
</div>

## Installation

```sh
# TODO: add installation instructions

```

## Usage

```ts
import htmltable from "htmltable"

htmltable.parse(`
  <table>
    <tr>
      <th>header 1</th>
      <th>header 2</th>
    </tr>
    <tr>
      <td>cell 1</td>
      <td>cell 2</td>
    </tr>
    <tr>
      <td colspan="2">cell 3</td>
    </tr>
  </table>
`)

/**
 * [
 *  [ "header 1", "header 2" ],
 *  [ "cell 1", "cell 2" ],
 *  [ "cell 3", "cell 3" ]
 * ]
 *
 * [!] "cell 3" is repeated because of colspan
 */
```
