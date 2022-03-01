import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-editor-v2',
  templateUrl: './contract-editor-v2.component.html',
  styleUrls: ['./contract-editor-v2.component.scss']
})
export class ContractEditorV2Component implements OnInit {
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  // content binding for the editor
  content;
  title : string = "Template Title Goes Here";

  constructor() { }

  ngOnInit(): void {
  }

  displayContent(content): void {
    console.log(content);
  }

}
