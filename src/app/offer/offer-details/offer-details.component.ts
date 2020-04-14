import {Component, OnInit} from '@angular/core';
import {Offer, OfferService} from "../../services/offer.service";
import {AuthService} from "../../services/auth.service";
import {Location} from '@angular/common';
import * as dateFns from 'date-fns'
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-offer-details',
    templateUrl: './offer-details.component.html',
    styleUrls: ['./offer-details.component.css'],

})
export class OfferDetailsComponent implements OnInit {

    offer: Offer;
    isOwner = false;
    date = new Date(Date.now());
    month = this.date.getMonth() + 1; // starts from 0
    daysInMonth = dateFns.getDaysInMonth(this.month);
    firstDayOfMonth = dateFns.startOfMonth(this.date);
    available = [];
    private error: any;

    constructor(private offerService: OfferService, private auth: AuthService, private location: Location, private router: Router) {
    }

    ngOnInit(): void {
        this.offer = this.offerService.detailedOffer;
        this.isOwner = this.offer.ownerEmail == this.auth.loggedEmail.value;
        this.auth.loggedEmail.subscribe(email => {
            this.isOwner = this.offer.ownerEmail == email;
        });

        this.available = this.generateMonth();

    }

    deleteOffer(id: number) {
        this.offerService.deleteOffer(id).subscribe(() => {
                this.location.back();
            },
            this.handleError
        );
    }

    handleError(error) {
        this.error = error.message;
    }

    nextDay(date: Date) {
        return dateFns.addDays(date, 1);
    }

    generateMonth() {
        let list = [];
        list[0] = this.firstDayOfMonth;

        for (let i = 1; i < this.daysInMonth - 1; i++) {
            let candidate = this.nextDay(list[i - 1]);
            list[i] = candidate;
        }

        let clearList = [];
        let i = 0;

        list.forEach((day) => {
            let alreadyBooked = false;
            this.offer.booked.forEach((booked) => {
                if (dateFns.isEqual(Date.parse(booked.bookedDate), Date.parse(dateFns.format(day, 'yyyy-MM-dd')))) {
                    alreadyBooked = true;
                }
            });
            if (!alreadyBooked) {
                clearList[i] = day;
                i++;
            }
        });

        let result = [];

        clearList.forEach((value, index) => {
            result[index] = dateFns.format(value, 'dd iii');
        });

        return result;
    }

    onSubmit(book: NgForm) {
        this.available.forEach(availableDate => {
            // if checkbox have label same as one of available then book it
            if (book[availableDate]) {
                // format: "2020-04-14"
                let split = availableDate.toString().split(" ");
                let day = split[0];
                let bookingDate = this.date.getFullYear() + "-0" + this.month + "-" + day;

                this.offerService.bookOffer(this.offer.id, bookingDate)
            }
        });
        // without timeout server had to little time to save and when get booked this new wasn't added to results
        // page reload was required then - but with timeout it works fine.
        setTimeout(() => {
            this.router.navigate(['/userDetails']);
        }, 1000)
    }

}



