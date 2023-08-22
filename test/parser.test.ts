import { CheerioTableParser } from "../src"

describe("Cheerio Html Table Parser", () => {
  it("should parse a table with colspan", () => {
    const cheerioTablePraser = new CheerioTableParser(
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
    const arr = cheerioTablePraser.parse()

    expect(arr).toEqual([
      ["header 1", "header 2"],
      ["cell 1", "cell 2", "cell 3"],
      ["cell 4", "cell 4"],
    ])
  })

  it("should parse a table with rowspan", () => {
    const cheerioTablePraser = new CheerioTableParser(
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
            <td rowspan="2">cell 4</td>
          </tr>
          <tr>
            <td>cell 5</td>
          </tr>
        </tbody>
      </table>
      `
    )
    const arr = cheerioTablePraser.parse()

    expect(arr).toEqual([
      ["header 1", "header 2"],
      ["cell 1", "cell 2", "cell 3"],
      ["cell 4"],
      ["cell 4", "cell 5"],
    ])
  })
})
