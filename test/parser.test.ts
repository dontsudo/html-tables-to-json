import { CheerioTableParser } from "../src"

describe("Cheerio Html Table Parser", () => {
  const cheerioTablePraser = new CheerioTableParser()
  it("should parse a table with colspan", () => {
    const arr = cheerioTablePraser.parse(`
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
    `)

    expect(arr[0]).toEqual([
      ["header 1", "header 2"],
      ["cell 1", "cell 2", "cell 3"],
      ["cell 4", "cell 4"],
    ])
  })

  it("should parse a table with rowspan", () => {
    const arr = cheerioTablePraser.parse(`
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
    `)

    expect(arr[0]).toEqual([
      ["header 1", "header 2"],
      ["cell 1", "cell 2", "cell 3"],
      ["cell 4"],
      ["cell 4", "cell 5"],
    ])
  })

  it("should parse a table with rowspan and colspan", () => {
    const arr = cheerioTablePraser.parse(`
    <table>
      <tbody>
        <tr>
          <th rowspan="9">header 1</th>
          <th>header 2</th>
          <td>cell 1</td>
          <td>cell 2</td>
        </tr>
        <tr>
          <th rowspan="3">header 3</th>
          <td>cell 3</td>
          <td rowspan="3">cell 4</td>
        </tr>
        <tr>
          <td>cell 5</td>
        </tr>
        <tr>
          <td>cell 6</td>
        </tr>
        <tr>
          <th>header 4</th>
          <td>cell 7</td>
          <td>cell 8</td>
        </tr>
      </tbody>
    </table>
    `)

    expect(arr[0]).toEqual([
      ["header 1", "header 2", "cell 1", "cell 2"],
      ["header 1", "header 3", "cell 3", "cell 4"],
      ["header 1", "header 3", "cell 5", "cell 4"],
      ["header 1", "header 3", "cell 6", "cell 4"],
      ["header 1", "header 4", "cell 7", "cell 8"],
    ])
  })
})
