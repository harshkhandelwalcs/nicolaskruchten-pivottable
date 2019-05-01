import { Component } from '@angular/core';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pivotTaBLE';
  constructor() {

  }
  ngOnInit() {
    $("#output").pivotUI(
      [
        { color: "blue", shape: "circle" },
        { color: "red", shape: "triangle" }
      ],
      {
        rows: ["color"],
        cols: ["shape"]
      }
    );
  }
}
