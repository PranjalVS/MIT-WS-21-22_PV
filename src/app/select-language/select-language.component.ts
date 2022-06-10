/**
 * Select Language Component
 * Defines Interface Languages
 * Method changeLanguage
 */

import { Component, OnInit } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';
import { DataService } from '../data.service';

interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.css']
})


export class SelectLanguageComponent implements OnInit {
  cComp : string;
  ngOnInit() {
    console.log("SelectLanguageComponent OnInit: " + this.translate.currentLang);
    switch (this.translate.currentLang) {
      case 'de':
        this.langView = "Sprache";
        this.currLangViewValue = 'DE';
        break;

      default:
        this.langView = "Language";
        this.currLangViewValue = 'EN';
        break;

   
    }
    this.data.changeLang(this.currLangViewValue);
    console.log(this.data.changeLang(this.currLangViewValue.toUpperCase()));
    console.log(this.data.currentLang);
    console.log("SelectLanguageComponent OnInit: " + this.currLangViewValue.toUpperCase());
  }

  constructor(public translate: TranslateService, private data : DataService) { }

  languages: Languages[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'de', viewValue: 'DE' }
  ]



  langView = 'Language'; // default language is English
  currLangViewValue: string = 'EN';


  /**
   * 
   * @param l {string}: language string in lower case
   * sets langView, which is shown in the template
   */
  changeLanguage(l: string): void {
    this.translate.use(l);
    let lang : string;
    console.log("changeLanguage: " + l);
    switch (l) {
      case 'de': this.langView = 'Sprache'; break;
      default: this.langView = 'Language'; break;
    }
    lang= l.toUpperCase();
    console.log(lang);
    this.data.changeLang(lang);//to share current language selection with other components
     
  }
}
