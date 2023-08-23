import * as cheerio from "cheerio"

// TODO: TableParser should be an interface

/**
 * Parses HTML into a DOM tree using Cheerio.
 */
class CheerioTableParser {
  private $!: cheerio.CheerioAPI

  /**
   * @returns array of cheerio instances representing the tables in the document
   */
  public parse(doc: string) {
    this.$ = cheerio.load(doc)

    const result: string[][][] = []
    const $tables = this.$("table")

    if ($tables.length === 0) {
      throw new Error("No tables found")
    }

    $tables.each((_, table) => {
      result.push(this.expandColspanRowspan(this.parseTr(this.$(table))))
    })

    return result
  }

  /**
   * Given a list of <tr>s, return a list of text rows.
   *
   * @see Any cell with `rowspan` or `colspan` will have its contents copied
   *      to subsequent cells.
   * @param $rows list of cheerio instances representing rows
   * @returns array of array, each returned row is a list of string text.
   */
  private expandColspanRowspan(
    $rows: cheerio.Cheerio<cheerio.Element>
  ): string[][] {
    const allTexts: string[][] = []
    let remainder: [number, string, number][] = [] // [index, text, rowspan]

    $rows.each((_, tr) => {
      const texts: string[] = []
      const nextRemainder: [number, string, number][] = []

      let index = 0
      const $tds = this.parseTd(this.$(tr))
      $tds.each((_, td) => {
        // push texts from previous rows with rowspan > 1 that come
        // before this <td>
        while (
          remainder.length > 0 &&
          remainder[0] &&
          remainder[0][0] <= index
        ) {
          const [prevIndex, prevText, prevRowspan] = remainder[0]
          texts.push(prevText)
          if (prevRowspan > 1) {
            nextRemainder.push([prevIndex, prevText, prevRowspan - 1])
          }
          index++
          remainder.shift()
        }

        const $td = this.$(td)

        // push the text from this <td>, colspan times
        const text = $td.text().trim()
        const rowspan = parseInt($td.attr("rowspan") || "1", 10)
        const colspan = parseInt($td.attr("colspan") || "1", 10)

        for (let i = 0; i < colspan; i++) {
          texts.push(text)
          if (rowspan > 1) {
            nextRemainder.push([index, text, rowspan - 1])
          }
          index++
        }
      })

      for (const [prevIndex, prevText, prevRowspan] of remainder) {
        texts.push(prevText)
        if (prevRowspan > 1) {
          nextRemainder.push([prevIndex, prevText, prevRowspan - 1])
        }
      }

      allTexts.push(texts)
      remainder = nextRemainder
    })

    return allTexts
  }

  /**
   * Return the list of row elements from the parsed table element.
   *
   * @param $table the table to parse
   * @returns array of cheerio instances representing the rows in the table
   */
  private parseTr(
    $table: cheerio.Cheerio<cheerio.Element>
  ): cheerio.Cheerio<cheerio.Element> {
    return $table.find("tr")
  }

  /**
   * @param $row the row to parse
   * @returns array of cheerio instances representing the cells in the row
   */
  private parseTd(
    $row: cheerio.Cheerio<cheerio.Element>
  ): cheerio.Cheerio<cheerio.Element> {
    return $row.find("td, th")
  }
}

export { CheerioTableParser }
