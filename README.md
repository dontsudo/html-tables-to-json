<div align="center">
	<h1>Parser for &lttable&gt to JSON</h1>
	<p>
		<b>A simple and easy to use parser for HTML table to JSON
	</p>
	<br />
</div>

## Installation

```sh
$ npm install html-tables-to-json
```

## Usage

```ts
import { CheerioTableParser } from "html-tables-to-json"

const tableParser = new CheerioTableParser()
const result = tableParser.parse(
  `
  <table>
    <tbody>
      <tr>
        <th>header 1</th>
        <th>header 2</th>
      </tr>
      <tr>
        <td>cell 1</td>
        <td>cell 2</td>
        <td>cell 3</td>
      </tr>
      <tr>
        <td colspan="2">cell 4</td>
      </tr>
    </tbody>
  </table>
  `
)

console.log(result[0])
// => output
// [
//  ["header 1", "header 2"],
//  ["cell 1", "cell 2", "cell 3"],
//  ["cell 4", "cell 4"],
// ]
```
