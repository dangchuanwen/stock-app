import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {News} from "../../search-home.component";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {
  @ViewChild('content') content: any;

  @Input() news: News[] = [];
  activeNews: News | undefined;
  closeResult = '';
  constructor(private modalService: NgbModal) { }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  handleClickNews(news: News) {
    console.log(news);
    this.activeNews = news;
    this.open(this.content);
  }

  handleClose() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
  }

}
