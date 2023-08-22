import { CheerioTableParser } from "../src"

const RAW_HTML = `
<table>
  <tbody>
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
  </tbody>
</table>
`

describe("Cheerio Based Html Table Parser", () => {
  it("should be constructed without throwing", () => {
    new CheerioTableParser(RAW_HTML)
  })

  it("should parse a table", () => {
    const parser = new CheerioTableParser(RAW_HTML)
    const arr = parser.parse()

    console.log(arr)
  })
})
