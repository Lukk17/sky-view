import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  error: string = null;

  constructor(private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(message: NgForm) {

    this.messageService.sentMessage(message).subscribe(message => {
      this.router.navigate(['/messages']);
    })

  }

}
