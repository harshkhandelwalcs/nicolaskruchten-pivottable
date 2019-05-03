import { Component } from '@angular/core';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';

declare var jQuery: any;
declare var $: any;
var derivers = $.pivotUtilities.derivers;
var renderers = $.extend($.pivotUtilities.renderers,
  $.pivotUtilities.plotly_renderers);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pivot Table Demo';
  public csvData: any;
  constructor() {

  }
  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csv = reader.result;
      this.csvData = this.csvToJson(csv);
      let rowArray = [];
      for (var key in this.csvData[0]) {
        if (this.csvData[0].hasOwnProperty(key)) {
          rowArray.push(key);
        }
      }
      if (this.csvData) {
        this.createTable(this.csvData, rowArray);
      }
    };
  }


  createTable(csvData, rows) {
    $("#output").pivotUI(

      csvData,
      {
        vals: rows,
        renderers: renderers
      }
    );
  }


  csvToJson(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const row = lines[i];
      let queryIdx = 0;
      let startValueIdx = 0;
      let idx = 0;
      if (row.trim() === '') { continue; }
      while (idx < row.length) {
        /* if we meet a double quote we skip until the next one */
        let c = row[idx];
        if (c === '"') {
          do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
        }
        if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
          /* we've got a value */
          let value = row.substr(startValueIdx, idx - startValueIdx).trim();
          /* skip first double quote */
          if (value[0] === '"') { value = value.substr(1); }
          /* skip last comma */
          if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
          /* skip last double quote */
          if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }
          const key = headers[queryIdx++];
          obj[key] = value;
          startValueIdx = idx + 1;
        }
        ++idx;
      }
      result.push(obj);
    }
    return result;
  }
  ngOnInit() {


  }
}
