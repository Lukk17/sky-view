import {Component, OnInit} from '@angular/core';
import {Message, MessageService} from "../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  RECEIVED_PAGE = "received";
  SENT_PAGE = "sent";

  sent: Message[];
  received: Message[];
  currentPage: string;


  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {

    this.messageService.getReceived().subscribe(messages => {
      this.received = messages;
    });

    this.messageService.getSent().subscribe(messages => {
      this.sent = messages;
    });

    this.currentPage = this.RECEIVED_PAGE;

  }

  goToSent() {
    this.currentPage = this.SENT_PAGE;
    console.log(this.currentPage)
  }

  goToReceived() {
    this.currentPage = this.RECEIVED_PAGE;
    console.log(this.currentPage)

  }
}

